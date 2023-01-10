import style from './css/modalPictures.module.scss'
const ModalPictures = ({currentPicture, setModalVisible}) => {


    return(
        <div className={style.modalPicture}>
            <div className={style.modalPictureContainer} >
                <img src={currentPicture} className={style.modalPictureImage}/>
                <button onClick={() => setModalVisible(false)} className={style.modalPictureButton}>x</button>
            </div>
        </div>
    )
}


export default ModalPictures;