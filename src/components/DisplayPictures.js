import PaginationPictures from "./PaginationPictures";
import ModalPictures from "./ModalPictures";
import AlertWindow from "./AlertWindow";
import style from './css/displayPicture.module.scss'
import {useState, useRef} from 'react'

const DisplayPictures = () => {

    const [inputValue, setInputValue] = useState('');
    const [currentPictures, setCurrentPictures] = useState([]);
    const [pictures, setPictures] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentPicture, setCurrentPicture] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);

    const searchWrapperRef = useRef(null);


    const showPicture = el => {
        setModalVisible(true);
        setCurrentPicture(el.target.src);
    }

    const changePage = el => {
        setCurrentPage(parseInt(el.target.innerText));
        setCurrentPictures(pictures.slice((el.target.innerText -1) * 6, ((el.target.innerText -1) * 6) + 6))
    }
    //keypress

    const pressKeyGetPicturesFromApi = el => {
        if(el.code === 'Enter') {
            getPicturesFromApi();
        }
    }
    console.log(inputValue)
    const getPicturesFromApi = () => {
        if(inputValue.trim() !== ''){
            fetch(`https://pixabay.com/api/?q=${inputValue}&key=22493407-0caddf5b23368eb1eb187ea62&per_page=100`)
                .then(res => res.json())
                .then(res => {
                    setPictures(() => res.hits)
                    setCurrentPictures(res.hits.slice(0, 6));
                    setCurrentPage(1);
                    searchWrapperRef.current.classList.add(style.searchActive);
                    setInputValue('');
                })
        }
        else {
            setAlertVisible(true);

            setTimeout(() => {
                setAlertVisible(false);

            }, 3000)
        }
    }

    return(
        <>
            <div>
                <div className={style.searchContainer}>
                    <div className={style.searchWrapper} ref={searchWrapperRef}>
                        <div className={style.titleSection}>
                            <h1 className={style.title}>Wyszukiwarka obrazków</h1>
                        </div>
                        <span className={style.searchInputWrapper}>
                            <input type="text" onChange={(e) => setInputValue(e.target.value)} onKeyPress={pressKeyGetPicturesFromApi} value={inputValue}  placeholder="Nazwa"/>
                            <span />
                        </span>
                        <button className={style.searchButton} onClick={getPicturesFromApi}>Wyszukaj obrazek</button>
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.picturesWrapper}>
                        {currentPictures.map((item, index) => <img className={style.pictures}  onClick={showPicture} key={index} src={item.largeImageURL} />)}
                    </div>
                    <PaginationPictures pictures={pictures} changePage={changePage} currentPage={currentPage}/>
                </div>
            </div>
            {modalVisible && <ModalPictures currentPicture={currentPicture} setModalVisible={setModalVisible}/>}
            {alertVisible && <AlertWindow />}
        </>
    )
}

export default DisplayPictures;
