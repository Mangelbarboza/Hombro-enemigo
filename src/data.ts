export type Profile = { uid:string; name:string; avatar:string };
export type Post = { id:string; uid:string; name:string; avatar:string; text:string; topic:string; mood:string; createdAt:number };
export type Reply = { id:string; uid:string; name:string; avatar:string; text:string; createdAt:number };
export type Message = { id:string; uid:string; text:string; createdAt:number };
export type Room = { id:string; members:string[]; names:Record<string,string>; createdAt:number };
export const topics = ['Todo','Vida cotidiana','Relaciones','Universidad','Ansiedad','Amistad','Pequeñas victorias'];
export const moods = [{emoji:'🌤️',label:'En calma'},{emoji:'🌧️',label:'Triste'},{emoji:'🌀',label:'Con ansiedad'},{emoji:'🌱',label:'Con esperanza'},{emoji:'🔥',label:'Frustrado'}];
const now = Date.now();
export const examples:Post[] = [
 {id:'demo-1',uid:'demo-luna',name:'Luna de papel',avatar:'🌙',topic:'Universidad',mood:'🌀',text:'¿A alguien más le pasa que siente que todos tienen su vida resuelta menos uno? Estoy a punto de terminar la universidad y, en lugar de emoción, siento un montón de incertidumbre. Hoy solo necesitaba decirlo.',createdAt:now-12*60000},
 {id:'demo-2',uid:'demo-brote',name:'Un pequeño brote',avatar:'🌱',topic:'Pequeñas victorias',mood:'🌱',text:'Hoy me animé a ir a tomar un café a solas. Sin esconderme detrás del teléfono, sin esperar a nadie. Parece una tontería, pero para mí fue un paso enorme. Quería compartir algo bonito por aquí ☕',createdAt:now-36*60000},
 {id:'demo-3',uid:'demo-mar',name:'Mar en pausa',avatar:'🌊',topic:'Relaciones',mood:'🌧️',text:'Estoy aprendiendo que poner límites también es una forma de querer. Cuesta muchísimo cuando siempre has sido la persona que dice que sí a todo. ¿Cómo empezaron ustedes?',createdAt:now-65*60000},
 {id:'demo-4',uid:'demo-sol',name:'Sol de domingo',avatar:'🌻',topic:'Amistad',mood:'🌤️',text:'Un recordatorio para quien lo necesite: no tienes que tener algo interesante que contar para escribirle a alguien. A veces un «me acordé de ti» es suficiente.',createdAt:now-120*60000}
];
export const exampleReplies:Record<string,Reply[]> = {'demo-1':[{id:'r1',uid:'demo-mar',name:'Mar en pausa',avatar:'🌊',text:'Me sentí igual al terminar. No tienes que resolver todo hoy. Un paso a la vez 🌱',createdAt:now-6*60000}],'demo-3':[{id:'r2',uid:'demo-sol',name:'Sol de domingo',avatar:'🌻',text:'Empecé por darme tiempo antes de responder. Un «te digo mañana» me ayudó mucho.',createdAt:now-30*60000}]};
export function ago(date:number){ const m=Math.max(0,Math.floor((Date.now()-date)/60000)); return m<1?'Ahora':m<60?`Hace ${m} min`:m<1440?`Hace ${Math.floor(m/60)} h`:new Date(date).toLocaleDateString('es'); }
