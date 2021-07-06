import { useHistory, useParams } from 'react-router-dom';
import { Button } from "../components/button";
import logoImg from '../assets/logo.svg';
import { RoomCode } from '../components/RoomCode';
import toast, { Toaster } from 'react-hot-toast';
import { FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { useEffect } from 'react';
import {Question} from '../components/Question';
import '../styles/room.scss';
import { useRoom } from '../hooks/useRoom';
import  deleteImg from '../assets/delete.svg'
import checkImg from '../assets/check.svg';
import answerImg from '../assets/answer.svg';

type RoomParams = {
    id: string;
}
export function AdminRoom(){
    const history = useHistory();
    const {user} = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');
   
    const roomId  = params.id;
    const {title, questions} = useRoom(roomId);
   
    async function handleLinkQuestion(questionId: string, hasLiked:boolean){
        if(hasLiked){
            await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).remove();
        }
        else{
            await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
                authorId: user?.id,
            })
        }
    }
   async function handleDeleteQuestion(questionId: string){
       if( window.confirm('Você tem Certeza que deseja exluir essa pergunta?')){
           await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
       }
    }
    async function handleEndRoom(){
        database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        });
        history.push('/')

    }
    async function handleCheckQuestionAsAnswered(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true

        });
       }
    
    async function handleHighlightQuestion(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true
            
        });
    }
    return(
        <div id="page-room">
            <Toaster/>
            <header>
                <div className = 'content'>
                  <img src = { logoImg } alt = "Letmeask"/>
                    <div>
                        <RoomCode code={roomId}/>
                        <Button isOutlined onClick={ handleEndRoom }>Encerrar Sala</Button>
                    </div>
                </div>
            </header>
           
            <main>
                <div className="room-title">
                    <h1>Sala {title} </h1>
                   {questions.length > 0  && <span>{questions.length} perguntas </span>}
                </div>
                    <div className="question-list">
                    {
                        questions.map((question) =>{
                            return(
                                <Question
                                    key = {question.id}
                                    content = {question.content}
                                    author = { question.author}
                                    isAnswered ={ question.isAnswered}
                                    isHighlighted  = {question.isHighlighted}
                                >
                                   
                                   {!question.isAnswered && (
                                        <>
                                            <button
                                            type ="button"
                                            onClick={()=> handleCheckQuestionAsAnswered(question.id)}
                                            >
                                                <img src = {checkImg} alt="Marcar Pergunta como respondida" />
                                            </button>
                                            <button
                                            type ="button"
                                            onClick={()=> handleHighlightQuestion(question.id)}
                                            >
                                                <img src = {answerImg} alt="Dar Destaque à pergunta" />
                                            </button>
                                        </>
                                   )}
                                    
                                    <button
                                    type ="button"
                                    onClick={()=> handleDeleteQuestion(question.id)}
                                    >
                                        <img src = {deleteImg} alt="Remover Pergunta" />
                                    </button>
                                </Question>
                            );
                        })
                    }
                    </div>
            </main>
        </div>
    );
}