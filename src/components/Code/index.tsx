import { TextCode, ImageCode, InputCode, BtnNext, NextText } from "./style";
import CodeImage from '../../assets/code.png';

type CodeProps = {
    nickname: string;
    code: string;
    updateCode: React.Dispatch<React.SetStateAction<string>>;
}

export default function Code(props: CodeProps){
    function verifyCode(){
        if(props.code === ""){
            alert("O campo codigo não pode estar vazio!");
        }
    }
    return (
        <>
            <TextCode>Está quase, {props.nickname}! Introduza na caixa abaixo o codigo para te juntares a um amigo!</TextCode>
            <ImageCode src={CodeImage} title="Insert Code" />
            <InputCode type="text" placeholder="Ex: 5CAF2" value={props.code} onChange={(e) => {props.updateCode(e.target.value)}} />
            <BtnNext onClick={() => {verifyCode()}}>
                <NextText>Começar</NextText>
            </BtnNext>
        </>
    );
}