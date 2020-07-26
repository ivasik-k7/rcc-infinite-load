import React from "react";
import ReactDOM from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import styled from "styled-components";

const ImageWrap = styled.div`
    height: 320px;
    flex-basis: 30%;
    padding: 5px;
`;
const Image = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
`;

const ImageSeparator = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const UnsplashImages = ({image}) => {
    return (
        <ImageWrap key={image.key}>
            <Image src={image.urls.raw} alt={image.alt_description} />
        </ImageWrap>
    );
};

export default class App extends React.Component {
    state = {
        images: [],
        isLoaded: false,
    };
    componentDidMount() {
        this.getUnsplash();
    }

    getUnsplash = (count = 8) => {
        const _APIBASE = "https://api.unsplash.com";
        const _APIKEY = "XXXXXXXXXXXXXXXXXXXXXXXXX";

        axios.get(`${_APIBASE}/photos/random?client_id=${_APIKEY}&count=${count}`).then((response) => {
            this.setState({
                isLoaded: true,
                images: [...this.state.images, ...response.data],
            });
        });
    };

    render() {
        const {images, isLoaded} = this.state;
        return (
            <div>
                <InfiniteScroll dataLength={images} next={() => this.getUnsplash()} hasMore={true} loader={<h2>Loading...</h2>}>
                    <ImageSeparator>{isLoaded ? images.map((image, idx) => <UnsplashImages image={image} key={idx} />) : null}</ImageSeparator>
                </InfiniteScroll>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
