import { useState } from "react";
import Challange from "../../components/Challange";
import Code from "../../components/Code";

import Nickname from "../../components/Nickname";
import Starting from "../../components/Starting";
import { BoxZone, BoxContainer, RPSText } from "./style";

export default function Game() {
    const [zone, setZone] = useState<Number>(0);
    const [nickname, setNickname] = useState<string>('');
    const [code, setCode] = useState<string>('');
    return (
        <BoxZone>
            <BoxContainer>
                <RPSText>Rock Paper Scissors</RPSText>
                {zone === 0 ?
                    <Nickname nickname={nickname} updateNickname={setNickname} updateZone={setZone} />
                : zone === 1 ?
                    <Starting nickname={nickname} updateZone={setZone} />
                : zone === 2 ?
                    <Code nickname={nickname} updateZone={setZone} updateCode={setCode} code={code} />
                : zone === 3 ?
                    <Challange playerName={nickname} code={code} updateCode={setCode} />
                : null }
            </BoxContainer>
        </BoxZone>
    );
}