import { useParams } from 'react-router-dom';
import { Button } from "../components/button";
import logoImg from '../assets/logo.svg';
import { RoomCode } from '../components/RoomCode';
import toast, { Toaster } from 'react-hot-toast';
import { FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { useEffect } from 'react';
import '../styles/room.scss';

type Question = {
    id: string;
    author:{
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
 
}
type FirebaseQuestions = Record<string,{
   author:{
       name: string;
       avatar: string;
   }
   content: string;
   isAnswered: boolean;
   isHighlighted: boolean;

}>
type RoomParams = {
    id: string;
}
export function Room(){
    
    const {user} = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestions ] = useState<Question[]>([]);
    const [ title, setTitle] = useState('');
    const roomId  = params.id;

    useEffect(() => {
        console.log(roomId);
        const roomRef = database.ref(`rooms/${roomId}`);
        roomRef.on('value',room =>{
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {} ;
            const parsedQuestions =  Object.entries(firebaseQuestions).map( ([key, value]) =>{
                return{
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                }

            })
            setQuestions(parsedQuestions);
            setTitle(databaseRoom.title);
        })
    }, [roomId]);


    async function handleSendQuestion(event: FormEvent){
        event.preventDefault();
        if(newQuestion.trim() === ''){
            return;
        }
        if(!user){
            throw new Error('You must be logged in')
            toast('Para postar uma questão você precisa fazer login!');
        }
        const question = {
            content: newQuestion,
            author:{
                name: user.name,
                avatar: user.avatar,
                
            },
            isHighlighted:false,
            isAnswered: false
        };
        await database.ref(`rooms/${roomId}/questions`).push(question);
        setNewQuestion('');

    }
    return(
        <div id="page-room">
            <Toaster/>
            <header>
                <div className = 'content'>
                  <img src = { logoImg } alt = "Letmeask"/>
                  <RoomCode code={roomId}/>
                </div>
            </header>
           
            <main>
                <div className="room-title">
                    <h1>Sala {title} </h1>
                   {questions.length > 0  && <span>{questions.length} perguntas </span>}
                </div>
                <br/>
                <br/>
                    <form
                    onSubmit={handleSendQuestion}
                    >
                        <textarea
                        placeholder = "O que você quer perguntar?"
                        onChange = {event => setNewQuestion(event.target.value)}
                        value = {newQuestion}
            
                        />
                        <div className="form-footer">
                           {user? (
                               <div className="user-info">
                                   <img src={user.avatar} alt={user.name}/>
                                   <span> {user.name} </span>
                               </div>
                           ):(
                            <span> Para enviar uma perguntar <button>faça seu login</button> .</span>
                           )}
                            <Button type = "submit">Enviar Pergunta</Button>
                        </div>
                    </form>
                
            </main>
        </div>
    );
}