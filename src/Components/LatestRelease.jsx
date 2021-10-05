import { useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import CommentArea from "./CommentArea";
import AddComment from "./AddComment"



import horror from "../Data/horror.json";
import history from "../Data/history.json";
import fantasy from "../Data/fantasy.json";
import romance from "../Data/romance.json";
import scifi from "../Data/scifi.json";


let category = [
  { genre: "Horror", content: horror },
  { genre: "History", content: history },
  { genre: "Fantasy", content: fantasy },
  { genre: "Romance", content: romance },
  { genre: "Scifi", content: scifi },
];

const LatestRelease = () => {

  /* state = {
    category: category[0].content,
    genre: category[0].genre,
    selectedBook: null,
    fetched: []
  }; */

  const [catg , setCategory] = useState(category[0].content)
  const [genre , setGenre] = useState(category[0].genre)
  const [fetched , setFetched] = useState([])



  const fetchedData = async (book) => {
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + book.asin,
        {
          method: "GET",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRiMWNlNjRiYjUzZDAwMTViMTllY2UiLCJpYXQiOjE2MzMwMDcyNjMsImV4cCI6MTYzNDIxNjg2M30.ZDL9OTcshlBWLagtOW6g0Sey_vs6vdIstYnehUcg4FY",
          },
        }
      );
      if (response.ok) {
        let data = await response.json();
        console.log({data});
        /* this.setState({
          fetched: data,
        }); */
        setFetched(data)
      } else {
        console.error("error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container fluid>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {genre}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {category.map((cat, i) => (
            <Dropdown.Item
              key={i}
              onClick={() => setCategory(cat.content)}
            >
              {cat.genre}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Row className="row-modified">
        {catg.map((book) => (
          <Col>
            <Card
              className="card-styled"
              onClick={() => {
                fetchedData(book);
              }}
            >
              <Card.Img
                className="card-styled"
                key={book.asin}
                variant="top"
                src={book.img}
              />
              {
              fetched[0]?.elementId === book.asin  ? 
              (
                <div className="card-on-top">
                  <AddComment asinOfBook={fetched[0]?.elementId}/>
                  <CommentArea selectedBook={fetched} />
                </div>
              ) 
              : (<></>)
              }
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default LatestRelease;