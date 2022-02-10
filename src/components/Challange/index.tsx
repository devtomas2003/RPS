import { useEffect, useState } from "react";
import io, { Socket } from 'socket.io-client';
import { TextChallange, VSText, BoxOptions, ItemOption, IOText, WhoPlay, LinkBack } from "./style";
import { GiRock, GiPaper, GiScissors } from 'react-icons/gi';

type ChallangeProps = {
    code: string,
    playerName: string,
    updateCode: React.Dispatch<React.SetStateAction<string>>;
};

export default function Challange(props: ChallangeProps){
    const [enemy, setEnemy] = useState<string>('');
    const [blocked, setBlocked] = useState<number>(9);
    const [enemyPlayed, setEnemyPlayed] = useState<Boolean>(false);
    const [enemyPontuation, setEnemyPontuation] = useState<number>(0);
    const [pontuation, setPontuation] = useState<number>(0);
    const [connection, setConnection] = useState<Socket>();
    useEffect(function(){
        function connectSocket() {
            const socket = io("http://localhost:8080/");
            setConnection(socket);
            const partyInfo = {
                playerName: props.playerName,
                code: props.code 
            }
            if(props.code === ""){
                socket.emit("create", JSON.stringify(partyInfo));
            }else{
                socket.emit("join", JSON.stringify(partyInfo));
            }
            socket.on('partyInfo', function(response){
                const partyProps = JSON.parse(response);
                props.updateCode(partyProps.code);
            });
            socket.on('partyData', function(response){
                const partyData = JSON.parse(response);
                setEnemy(partyData.enemy);
            });
            socket.on('enemyJoin', function(response){
                const enemyData = JSON.parse(response);
                setEnemy(enemyData.enemy);
            });
            socket.on('enemyPlayed', function(){
                setEnemyPlayed(true);
            });
            socket.on('moveResult', function(response){
                const result = JSON.parse(response);
                setBlocked(9);
                if(result.result === "perdeu"){
                    console.log(result.enemyPoints);
                    setEnemyPontuation(result.enemyPoints);
                    alert("PERDESTE!!!!!");
                    setEnemyPlayed(false);
                }else if(result.result === "empatou"){
                    alert("EMPATOU!!!");
                    setEnemyPlayed(false);
                }else{
                    console.log(result.pontos);
                    setPontuation(result.pontos);
                    alert("GANHOU!!!!!");
                    setEnemyPlayed(false);
                }
            });
        }
        connectSocket();
    }, []);
    function selectOption(jogada: number){
        if(blocked === 9){
            setBlocked(jogada);
            const moveSelected = {
                jogada,
                code: props.code
            };
            connection?.emit("gamerSelect", JSON.stringify(moveSelected));
        }
    }
    return (
        <>
            <TextChallange><VSText>Código: </VSText>{props.code} <LinkBack>Sair da partida</LinkBack></TextChallange>
            { enemy !== "" ? <TextChallange>{props.playerName} <VSText>vs</VSText> {enemy}</TextChallange> : <TextChallange>A aguardar adversário</TextChallange>}
            { enemy !== "" ? <TextChallange>{pontuation} <VSText>-</VSText> {enemyPontuation}</TextChallange> : null }
            <WhoPlay>{props.playerName}: Seleciona uma jogada</WhoPlay>
            <BoxOptions>
                <ItemOption isAtive={blocked === 0 ? true : false} onClick={() => { selectOption(0); }}>
                    <GiRock size={100} color="#333" />
                    <IOText>Pedra</IOText>
                </ItemOption>
                <ItemOption isAtive={blocked === 1 ? true : false} onClick={() => { selectOption(1); }}>
                    <GiPaper size={100} color="#333" />
                    <IOText>Papel</IOText>
                </ItemOption>
                <ItemOption isAtive={blocked === 2 ? true : false} onClick={() => { selectOption(2); }}>
                    <GiScissors size={100} color="#333" />
                    <IOText>Tesoura</IOText>
                </ItemOption>
            </BoxOptions>
            { enemy !== "" ? <WhoPlay>{enemy}: { !enemyPlayed ? 'Ainda não jogou!' : 'Já jogou!' }</WhoPlay> : null }
        </>
    );
}