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
    const [connection, setConnection] = useState<Socket>();

    const [enemyPlayed, setEnemyPlayed] = useState<Boolean>(false);
    const [localPlayed, setLocalPlayed] = useState<Boolean>(false);
    const [blocked, setBlocked] = useState<number>(9);

    const [errorParty, setErrorParty] = useState<string>('');
    const [partyData, setPartyData] = useState<string>('');

    const [enemyPontuation, setEnemyPontuation] = useState<number>(0);
    const [pontuation, setPontuation] = useState<number>(0);

    function showFinal(text: string){
        setPartyData(text);
        setTimeout(function(){
            setPartyData('');
        }, 4000);
    }

    function codeToName(code: number){
        return code === 0 ? 'Pedra' : code === 1 ? "Papel" : "Tesoura";
    }

    useEffect(function(){
        function connectSocket() {
            const socket = io("https://rps-tnd.herokuapp.com/");
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
            socket.on('partyError', function(error){
                if(error === 0){
                    setErrorParty('O codigo introduzido é invalido!');
                }else if(error === 1){
                    setErrorParty('A sala já está cheia!');
                }else{
                    setErrorParty('Já existe alguem com o seu nome nesta sala!');
                }
            });
            socket.on('moveResult', function(response){
                const result = JSON.parse(response);
                setBlocked(9);
                setLocalPlayed(false);
                setEnemyPlayed(false);
                if(result.result === "perdeu"){
                    setEnemyPontuation(result.enemyPoints);
                    showFinal("Perdeste! :( O adversário jogou " + codeToName(result.enemy));
                }else if(result.result === "empatou"){
                    showFinal("Empate! O adversário também jogou " + codeToName(result.enemy));
                }else{
                    setPontuation(result.pontos);
                    showFinal("Ganhaste! O adversário jogou " + codeToName(result.enemy));
                }
            });
        }
        connectSocket();
    }, []);
    function selectOption(jogada: number){
        if(blocked === 9){
            setLocalPlayed(true);
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
            <TextChallange><VSText>Código: </VSText>{props.code} <LinkBack onClick={() => { location.reload(); }}>Sair da partida</LinkBack></TextChallange>
            { errorParty !== "" ? <TextChallange>{errorParty}</TextChallange> : null }
            { errorParty === "" ? enemy !== "" ? <TextChallange>{props.playerName} <VSText>vs</VSText> {enemy}</TextChallange> : <TextChallange>Oi, {props.playerName}: A aguardar adversário</TextChallange> : null }
            { partyData !== "" ? <TextChallange>{partyData}</TextChallange> : null }
            { enemy !== "" ? <>
            <TextChallange>{pontuation} <VSText>-</VSText> {enemyPontuation}</TextChallange>
            { partyData === "" ?
            <>
            <WhoPlay>{props.playerName}: { !localPlayed ? 'Seleciona uma jogada' : 'Já jogaste' }</WhoPlay>
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
            <WhoPlay>{enemy}: { !enemyPlayed ? 'Ainda não jogou!' : 'Já jogou!' }</WhoPlay>
            </>
            : null }
            </>
             : null }

        </>
    );
}