import React, {Component} from 'react';
import styles from "../../styles/components/Gallery.module.scss";

class Gallery extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`${styles.gallery__section} flex justify-around`}>
                <div className="text-center">
                    <h2 className="text-center mt-4 capitalize text-trips-1">{this.props.title}</h2>
                    <div className={`${styles.image__container}`}>
                        {
                            this.props.galleryDetails.map(el =>
                                <div className={`${styles.image}`} key={el.key}>
                                    <img loading="lazy" src={el.image}/>
                                    <img loading="lazy" src={el.image}/>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    };
}

export default Gallery;
