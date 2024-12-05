import { useEffect, useState } from 'react';
import { Alert, Col, Container, Row, Spinner, Stack } from 'react-bootstrap';
import { getWatchLaterVideos } from '../api/apiWatch_later';
import { getThumbnail } from '../api';

const Watch_laterPage = () => {
    const [watchLater, setWatchLater] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem("user")));

    useEffect(() => {
        setIsLoading(true);
        getWatchLaterVideos(currentUser.id)
            .then((data) => {
                setWatchLater(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }, [currentUser.id]);

    return (
        <Container className="mt-4">
            <Stack direction="horizontal" gap={3} className="mb-3">
                <h1 className="h4 fw-bold mb-0 text-nowrap text-white">Watch Later</h1>
                <hr className="border-top border-light opacity-50 w-100" />
            </Stack>
            {isLoading ? (
                <div className="text-center">
                    <Spinner
                        as="span"
                        animation="border"
                        variant="primary"
                        size="lg"
                        role="status"
                        aria-hidden="true"
                    />
                    <h6 className="mt-2 mb-0">Loading...</h6>
                </div>
            ) : watchLater?.length > 0 ? (
                <Row>
                    {watchLater?.map((item) => (
                        <Col md={6} lg={4} className="mb-3" key={item.id}>
                            <div
                                className="card text-black"
                                style={{ aspectRatio: "16 / 9" }}
                            >
                                <img
                                    src={getThumbnail(item.thumbnail)}
                                    className="card-img w-100 h-100 object-fit-cover bg-light"
                                    alt="..."
                                />
                                <div className="card-body">
                                    <h5 className="card-title text-truncate">{item.title}</h5>
                                    <p className="card-text">{item.description}</p>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            ) : (
                <Alert variant="dark" className="text-center">
                    No videos in your watch later list yet ☹️
                </Alert>
            )}
        </Container>
    );
};

export default Watch_laterPage;