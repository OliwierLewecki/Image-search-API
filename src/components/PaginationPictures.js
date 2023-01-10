import style from './css/paginationPictures.module.scss'
const PaginationPictures = ({pictures, changePage, currentPage}) => {
    const numberOfPages = Math.ceil(pictures.length / 12)
    console.log(numberOfPages);


    return (
        <div className={style.changePictureButtonsWrapper}>
            {[...Array(numberOfPages)].map((el, index) => <button className={style.changePictureButtons} style={{background: currentPage === index + 1 ? 'linear-gradient(21deg, #10abff, #1beabd)'  : 'rgba(120, 120, 120, 0.46)', cursor: 'pointer'}
            }  onClick={changePage} key={index}>{index + 1}</button>)}
        </div>
    )
}

export default PaginationPictures;
