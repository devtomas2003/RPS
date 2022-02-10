import { TextStarting, BoxSelect, BoxBigBtn, BBBText } from "./style";
import { GoDiffAdded } from 'react-icons/go';
import { BsFillPlayFill } from 'react-icons/bs';

type StartingProps = {
    nickname: string;
    updateZone: React.Dispatch<React.SetStateAction<Number>>;
}

export default function Starting(props: StartingProps){
    return (
        <>
            <TextStarting>Olá, {props.nickname}! Vamos começar? Selecione a forma como pretende juntar-se a uma partida!</TextStarting>
            <BoxSelect>
                <BoxBigBtn onClick={() => {props.updateZone(3)}}>
                    <GoDiffAdded size={80} color="#fff" />
                    <BBBText>Criar uma nova sala</BBBText>
                </BoxBigBtn>
                <BoxBigBtn onClick={() => {props.updateZone(2)}}>
                    <BsFillPlayFill size={80} color="#fff" />
                    <BBBText>Entrar numa sala já criada</BBBText>
                </BoxBigBtn>
            </BoxSelect>
        </>
    );
}