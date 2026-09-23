const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getMessaging } = require('firebase-admin/messaging');

initializeApp();
const db = getFirestore();

async function notify(uid, id, data) {
  if (!uid || uid === data.actorUid) return;
  const ref = db.doc(`users/${uid}/notifications/${id}`);
  if ((await ref.get()).exists) return;
  await ref.set({ ...data, read: false, createdAt: Date.now() });
  const devices = await db.collection(`users/${uid}/devices`).get();
  if (devices.empty) return;
  const docs = devices.docs.filter(item => item.data().token);
  const tokens = docs.map(item => item.data().token);
  const result = await getMessaging().sendEachForMulticast({
    tokens,
    data: {
      title: data.title,
      body: data.text,
      notificationId: id,
      url: data.postId ? `/?post=${data.postId}` : data.roomId ? `/?room=${data.roomId}` : data.groupId ? `/?group=${data.groupId}` : '/'
    },
    webpush: { fcmOptions: { link: data.postId ? `/?post=${data.postId}` : '/' } }
  });
  const stale = [];
  result.responses.forEach((response, index) => {
    if (!response.success && ['messaging/registration-token-not-registered','messaging/invalid-registration-token'].includes(response.error?.code)) stale.push(docs[index].ref.delete());
  });
  await Promise.all(stale);
}

exports.onReplyCreated = onDocumentCreated('posts/{postId}/replies/{replyId}', async event => {
  const reply = event.data?.data();
  if (!reply) return;
  const post = await db.doc(`posts/${event.params.postId}`).get();
  if (!post.exists) return;
  await notify(post.data().uid, `reply_${event.params.postId}_${event.params.replyId}`, {
    type: 'reply', title: 'Nueva respuesta', text: `${reply.name} respondió tu desahogo`, actorUid: reply.uid, postId: event.params.postId
  });
});

exports.onPrivateMessageCreated = onDocumentCreated('rooms/{roomId}/messages/{messageId}', async event => {
  const message = event.data?.data();
  const room = await db.doc(`rooms/${event.params.roomId}`).get();
  if (!message || !room.exists) return;
  const data = room.data(), recipient = data.members.find(uid => uid !== message.uid);
  await notify(recipient, `message_${event.params.roomId}_${event.params.messageId}`, {
    type: 'message', title: 'Mensaje privado', text: `${data.names[message.uid] || 'Alguien'} te escribió`, actorUid: message.uid, roomId: event.params.roomId
  });
});

exports.onGroupMessageCreated = onDocumentCreated('groups/{groupId}/messages/{messageId}', async event => {
  const message = event.data?.data();
  const group = await db.doc(`groups/${event.params.groupId}`).get();
  if (!message || !group.exists) return;
  const data = group.data();
  await Promise.all(data.members.filter(uid => uid !== message.uid).map(uid => notify(uid, `group_${event.params.groupId}_${event.params.messageId}`, {
    type: 'group_message', title: data.name, text: `${data.names[message.uid] || 'Alguien'} envió un mensaje`, actorUid: message.uid, groupId: event.params.groupId
  })));
});

exports.onGroupInviteCreated = onDocumentCreated('users/{userId}/groupInvites/{groupId}', async event => {
  const invite = event.data?.data();
  if (!invite || invite.status !== 'pending') return;
  await notify(event.params.userId, `invite_${event.params.groupId}`, {
    type: 'invite', title: 'Invitación a grupo', text: `${invite.fromName} te invitó a ${invite.groupName}`, actorUid: invite.fromUid, groupId: event.params.groupId
  });
});
