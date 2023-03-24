import React from "react";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import TestAxios from "../../apis/TestAxios";
import { withNavigation } from "../../routeconf";

class DodavanjeTakmicara extends React.Component {
  constructor(props) {
    super(props);

    let utakmica = {
        reprezentacijaAId:"",
        reprezentacijaBId:""
      
    };

    this.state = { utakmica : utakmica,reprezentacije:[]};
    this.create = this.create.bind(this);

}

  componentDidMount() {
    this.getReprezentacije()
    }

     getReprezentacije(){
        TestAxios.get("/reprezentacije")
        .then((response)=>{
            this.setState({reprezentacije:response.data});
        })
        .catch((err=>{console.log(err)}));
    }

     create() {
    let utakmica=this.state.utakmica;
    const utakmicaDTO = {
      reprezentacijaAId:utakmica.reprezentacijaAId,
      reprezentacijaBId:utakmica.reprezentacijaBId

    };

     TestAxios.post("/utakmice", utakmicaDTO)
      .then((res) => {
        // handle success
        console.log(res);

        alert("Dodat!");
        this.props.navigate("/utakmice");
      })
      .catch((error) => {
        // handle error
        console.log(error);
        alert("Niste dodali !");
      });
  }

 
reprezentacijaAIzmena(e){
    // console.log(e);

    let reprezentacijaAId = e.target.value;

    let utakmica = this.state.utakmica;
    utakmica.reprezentacijaAId = reprezentacijaAId;

    this.setState({utakmica: utakmica});
}

reprezentacijaBIzmena(e){
    // console.log(e);

    let reprezentacijaBId = e.target.value;

    let utakmica = this.state.utakmica;
    utakmica.reprezentacijaBId = reprezentacijaBId;

    this.setState({utakmica: utakmica});
}

  render() {
    return (
      <>
        <Row>
          <Col></Col>
          <Col xs="12" sm="10" md="8">
            <h1 style={{color: "purple"}}>Dodavanje utakmice B</h1>
            <Form>

              
                
              <Form.Group>
                    <Form.Label>Reprezentacija A</Form.Label>
                    <Form.Select name="reprezentacijaAId" onChange={(e)=>this.reprezentacijaAIzmena(e)}>
                        <option></option>
                        {this.state.reprezentacije.map((rep)=>{
                            return(
                                <option key={rep.id} value={rep.id}>{rep.naziv}</option>
                            );
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Reprezentacija B</Form.Label>
                    <Form.Select name="reprezentacijaBId" onChange={(e)=>this.reprezentacijaBIzmena
                        (e)}>
                        <option></option>
                        {this.state.reprezentacije.map((rep)=>{
                            return(
                                <option key={rep.id} value={rep.id}>{rep.naziv}</option>
                            );
                        })}
                    </Form.Select>
                </Form.Group>
              <Button style={{ marginTop: "25px" }} onClick={this.create}>
                Dodaj utakmicu
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </>
    );
  }
}

export default withNavigation(DodavanjeTakmicara);
