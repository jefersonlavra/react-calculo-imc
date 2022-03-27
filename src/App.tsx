import { useState } from 'react';
import styles from './App.module.css';
import { GridItem } from './components/GridItem';
import {levels, calculeIMC, Level} from './helpers/imc';
import poweredImg from './assets/powered.png';
import leftArrowImg from './assets/leftarrow.png';

const App = () => {

    const [heightField, setHeightField] = useState<number>(0);
    const [weightField, setWeightField] = useState<number>(0);
    const [toShow, setToShow] = useState<Level | null>(null);

    const handleCalculateButton = () => {
        if(heightField && weightField) {
            setToShow(calculeIMC(heightField, weightField));
        }
        else {
            alert("Digte todos os campos.");
        }
    }

    const handleBackButton = () => {
        setHeightField(0);
        setWeightField(0);
        setToShow(null);
    }

    return (
        <div className={styles.main}>
            <header>
                <div className={styles.headerContainer}>
                    <img src={poweredImg} alt="" width={150} />
                </div>
            </header>
            <div className={styles.container}>

                <div className={styles.leftSide}>
                    <h1>Calcule o seu IMC</h1>
                    <p>IMC é a sigla para índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcularo peso ideal de cada pessoa.</p>

                    <input type="number" disabled={toShow ? true : false} value={heightField > 0 ? heightField : ''} onChange={e => setHeightField(parseFloat(e.target.value))} placeholder="Digite a sua altura. Ex: 1.5 (em metros)" />
                    <input type="number" disabled={toShow ? true : false} value={weightField > 0 ? weightField : ''} onChange={e => setWeightField(parseFloat(e.target.value))} placeholder="Digite o seu peso. Ex: 75.3 (em Kg)" />
                    
                    <button disabled={toShow ? true : false} onClick={handleCalculateButton}>Calcular</button>
                </div>

                <div className={styles.rightSide}>
                    {!toShow && 
                        <div className={styles.grid}>
                            {levels.map((item, key) => (
                                <GridItem key={key} item={item}/>
                            ))}
                        </div>
                    }
                    {toShow && 
                        <div className={styles.rightBig}>
                            <div className={styles.rightArrow} onClick={handleBackButton}>
                                <img src={leftArrowImg} alt="" width={25} />
                            </div>
                            <GridItem item={toShow} />
                        </div>
                    }
                </div>

            </div>
        </div>
    );
}

export default App;