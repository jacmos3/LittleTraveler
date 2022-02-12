import React, {Component} from 'react';
import {Card} from 'semantic-ui-react';
import styles from "../../styles/components/Gallery.module.scss";

class Gallery extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        var images = [
            {key: "1", image: 'img/littletravelers/church-441956-lt.png'},
            {key: "2", image: 'img/littletravelers/mountain-1862077-lt.png'},
            {key: "3", image: 'img/littletravelers/petronas-twin-towers-at-night-kuala-lumpur-malaysia-lt.png'},
            {key: "4", image: 'img/littletravelers/pexels-dlkr-5493279-lt.png'},
            {key: "5", image: 'img/littletravelers/types/Little-Traveler-1.png'},
            {key: "6", image: 'img/littletravelers/types/Little-Traveler-2.png'},
            {key: "7", image: 'img/littletravelers/pexels-shahbaz-zaman-4609844-lt.png'},
            {key: "8", image: 'img/littletravelers/danyu-wang-sR7_ImYvt1Q-lt.png'},
            {key: "9", image: 'img/littletravelers/robot-1464596-lt.png'},
            {key: "10", image: 'img/littletravelers/future-3716486-lt.png'},
            {key: "11", image: 'img/littletravelers/types/Little-Traveler-3.png'},
            {key: "12", image: 'img/littletravelers/types/Little-Traveler-5.png'},

            /*  {image:'img/littletravelers/types/Little-Traveler-4.png'},
              {image:'img/littletravelers/types/Little-Traveler-7.png'},
              {image:'img/littletravelers/types/Little-Traveler-8.png'},
              {image:'img/littletravelers/types/Little-Traveler-9.png'},

              {image:'img/littletravelers/types/Little-Traveler-10.png'},
              {image:'img/littletravelers/types/Little-Traveler-12.png'}*/
        ]

        return (
            <div className="flex justify-around">
                <div className="text-center">
                    <h2 className="text-center mt-4 capitalize text-trips-1">An Incredible Variety of Travelers</h2>
                    <div className={`${styles.image__container}`}>
                        {
                            images.map(el =>
                                <div className={`${styles.image}`} key={el.key}>
                                  <img loading="lazy" src={el.image} />
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
