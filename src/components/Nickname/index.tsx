import { WellcomeTxt, ImageLogon, InputName, BtnNext, NextText } from "./style";
import LoginImage from '../../assets/login.png';
import { MdNavigateNext } from 'react-icons/md';

type NicknameProps = {
    nickname: string;
    updateNickname: React.Dispatch<React.SetStateAction<string>>;
    updateZone: React.Dispatch<React.SetStateAction<Number>>;
}

export default function Nickname(props: NicknameProps){
    function saveNickname(){
        if(props.nickname === ""){
            alert("O campo nickname não pode estar vazio!");
        }else{
            props.updateZone(1);
        }
    }
    return (
        <>
            <WellcomeTxt>Bem vindo ao Pedra Papel Tesoura, indique o seu nickname na caixa abaixo para começar!</WellcomeTxt>
            <ImageLogon src={LoginImage} title="Nickname" />
            <InputName type="text" value={props.nickname} onChange={(e) => { props.updateNickname(e.target.value) }} placeholder="O seu melhor nickname" />
            <BtnNext onClick={() => {saveNickname()}}>
                <NextText>Continuar</NextText>
                <MdNavigateNext color="#fff" size={32} />
            </BtnNext>
        </>
    );
}