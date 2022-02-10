import { useEffect, useState } from "react";
import io from 'socket.io-client';
import { TextChallange, VSText, BoxOptions, ItemOption, IOText, WhoPlay, LinkBack } from "./style";
import { GiRock, GiPaper, GiScissors } from 'react-icons/gi';

type ChallangeProps = {
    code: string,
    playerName: string,
    updateCode: React.Dispatch<React.SetStateAction<string>>;
};

export default function Challange(props: ChallangeProps){
    const [enemy, setEnemy] = useState<string>('');
    useEffect(function(){
        function connectSocket() {
            const socket = io("http://localhost:8080/");
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
        }
        connectSocket();
    }, [])
    return (
        <>
            <TextChallange><VSText>Código: </VSText>{props.code} <LinkBack>Sair da partida</LinkBack></TextChallange>
            <TextChallange>{props.playerName} <VSText>vs</VSText> {enemy}</TextChallange>
            <TextChallange>5 <VSText>-</VSText> 2</TextChallange>
            <WhoPlay>Pessoa 1:</WhoPlay>
            <BoxOptions>
                <ItemOption>
                    <GiRock size={100} color="#333" />
                    <IOText>Pedra</IOText>
                </ItemOption>
                <ItemOption>
                    <GiPaper size={100} color="#333" />
                    <IOText>Papel</IOText>
                </ItemOption>
                <ItemOption>
                    <GiScissors size={100} color="#333" />
                    <IOText>Tesoura</IOText>
                </ItemOption>
            </BoxOptions>
            <WhoPlay>Pessoa 2: Ainda não jogou!</WhoPlay>
        </>
    );
}