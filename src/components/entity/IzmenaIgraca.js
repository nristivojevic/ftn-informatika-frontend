import React from 'react';
import TestAxios from './../../apis/TestAxios';
import {Col, Row, Form, Button} from 'react-bootstrap';
import {withParams, withNavigation} from '../../routeconf';

class IzmenaIgraca extends React.Component {

    constructor(props) {
        super(props);

        this.state = { igracId: -1,
             ime: '',
            prezime: -1,
            postignutiGolovi:'',
            reprezentacijaId:-1,
            reprezentacijaNaziv:'' }
    }

    componentDidMount() {
        this.getIgracById(this.props.params.id);
     }
 
     getIgracById(igracId) {
         TestAxios.get('/igraci/' + igracId)
         .then(res => {
             // handle success
             console.log(res);
             this.setState({igracId: res.data.id,
                 ime: res.data.ime,
                  prezime:res.data.prezime,
                  postignutiGolovi:res.data.postignutiGolovi,
                   reprezentacijaId: res.data.reprezentacijaId,
                   reprezentacijaNaziv:res.data.reprezentacijaNaziv
                 });
         })
         .catch(error => {
             // handle error
             console.log(error);
             alert('Error !');
          });
     }

     goloviIzmena = event => {
        console.log(event.target.value);

        const { name, value } = event.target;
        console.log(name + ", " + value);

        this.setState((state, props) => ({
            postignutiGolovi: value
        }));
    }

    edit() {
        var params = {
            'id': this.state.igracId,
            'ime': this.state.ime,
            'prezime': this.state.prezime,
            'postignutiGolovi':this.state.postignutiGolovi,
            'reprezentacijaId':this.state.reprezentacijaId,
            'reprezentacijaNaziv':this.state.reprezentacijaNaziv
        };

        TestAxios.put('/igraci/' + this.state.igracId, params)
        .then(res => {
            // handle success
            console.log(res);
            alert('Izmenjeno!');
            this.props.navigate('/igraci');
        })
        .catch(error => {
            // handle error
            console.log(error);
            alert('Greska !');
         });
    }

     render() {
        return (
            <Col>
                <Row><h1>Edit </h1></Row>
                <Row>
                <Form>
                    <Form.Group>
                    <Form.Label htmlFor="ime">Ime</Form.Label>
                    <Form.Control id="ime" type="text" value={this.state.ime}/>
                    </Form.Group>
                    <Form.Group>
                    <Form.Label htmlFor="prezime">Prezime</Form.Label>
                    <Form.Control id="prezime" type="text" value={this.state.prezime}/>
                    </Form.Group>
                   <Form.Group>
                    <Form.Label htmlFor="postignutiGolovi">Postignuti golovi</Form.Label>
                    <Form.Control id="postignutiGolovi" type="number" value={this.state.postignutiGolovi} onChange={(e) => this.goloviIzmena(e)}/>
                    </Form.Group>
                    <Form.Group>
                    <Form.Label htmlFor="reprezentacijaNaziv">Naziv reprezentacije</Form.Label>
                    <Form.Control id="reprezentacijaNaziv" type="text" value={this.state.reprezentacijaNaziv} />
                    </Form.Group>
                </Form>
                </Row>
                <Button className="button button-navy" onClick={() => this.edit()}>Izmeni</Button>
            </Col>
        );
    }
}

export default withNavigation(withParams(IzmenaIgraca))