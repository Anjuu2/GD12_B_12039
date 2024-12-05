import { useEffect, useState } from "react"; 
import { Alert, Col, Container, Row, Spinner, Stack, Button } from "react-bootstrap"; 
import { GetAllContents } from "../api/apiContent"; 
import { getThumbnail } from "../api";
import { addToWatchLater, getWatchLaterVideos } from "../api/apiWatch_later";
import { toast } from "react-toastify";
import 'bootstrap-icons/font/bootstrap-icons.css';

const DashboardPage = () => { 
    const [contents, setContents] = useState([]); 
    const [isLoading, setIsLoading] = useState(false); 
    const [watchLaterVideos, setWatchLaterVideos] = useState([]);

    useEffect(() => { 
        setIsLoading(true);
        GetAllContents() 
            .then((data) => { 
                setContents(data); 
                setIsLoading(false); 
            }) 
            .catch((err) => { 
                console.log(err); 
            });

        getWatchLaterVideos()
            .then((data) => {
                setWatchLaterVideos(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleAddToWatchLater = async (contentId) => {
        const isAlreadyInWatchLater = watchLaterVideos.some(video => video.id === contentId);

        if (isAlreadyInWatchLater) {
            toast.info("Video sudah ada di Watch Later!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
            });
            return;
        }

        try {
            await addToWatchLater(contentId);
            toast.success("Video berhasil ditambahkan ke Watch Later!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
            });

            getWatchLaterVideos()
                .then((data) => {
                    setWatchLaterVideos(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            toast.error("Gagal menambahkan video ke Watch Later!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
            });
        }
    };

    return ( 
        <Container className="mt-4"> 
            <Stack direction="horizontal" gap={3} className="mb-3"> 
                <h1 className="h4 fw-bold mb-0 text-nowrap text-white">Rekomendasi Untukmu</h1> 
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
            ) : contents?.length > 0 ? (
                <Row> 
                    {contents?.map((content) => ( 
                        <Col md={6} lg={4} className="mb-3" key={content.id}> 
                            <div 
                            className="card text-black" 
                            style={{ aspectRatio: "16 / 9" }} 
                            > 
                                <img 
                                src={getThumbnail(content.thumbnail)} 
                                className="card-img w-100 h-100 object-fit-cover bg-light" 
                                alt="..." 
                                /> 
                                <div className="card-body position-relative"> 
                                    <h5 className="card-title text-truncate"> 
                                        {content.title} 
                                    </h5>
                                    <p className="card-text">{content.description}</p>
                                    <Button
                                        variant="success"
                                        className="btn-sm position-absolute bottom-0 end-0 m-3"
                                        onClick={() => handleAddToWatchLater(content.id)} // Menambahkan event handler
                                    >
                                        <i className="bi bi-stopwatch-fill"></i>
                                    </Button>
                                </div> 
                            </div> 
                        </Col> 
                    ))} 
                </Row> 
            ) : ( 
                <Alert variant="dark" className="text-center"> 
                    Tidak ada video untukmu saat ini ☹️ 
                </Alert> 
            )} 
        </Container> 
    );
}; 

export default DashboardPage;
