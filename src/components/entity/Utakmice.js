import React from 'react';
import TestAxios from '../../apis/TestAxios';
import { Row, Col, Button, Table, Form } from 'react-bootstrap'
import './../../index.css';
import { withParams, withNavigation } from '../../routeconf'

class Utakmice extends React.Component {

constructor(props) {
    super(props);
    this.state = {
        utakmice: [],
        pageNo: 0,
        totalPages: 0,
    }
}

componentDidMount() {
    this.getUtakmice(0);
}

getUtakmice(newPageNo) {
    let config = {
        params: {
            pageNo: newPageNo,
        }
    }

    TestAxios.get('/utakmice', config)
        .then(res => {
            console.log(res);
            this.setState({
                utakmice: res.data,
                pageNo: newPageNo,
                totalPages : res.headers['total-pages']
            });
        })
        .catch(error => {
            // handle error
            console.log(error);
            alert('Error!');
        });
}




goToAdd() {
    this.props.navigate('/utakmice/add');
}
deleteFromState(utakmicaId) {
    var utakmice = this.state.utakmice;
    utakmice.forEach((element, index) => {
        if (element.id === utakmicaId) {
            utakmice.splice(index, 1);
            this.setState({ utakmice: utakmice });
            window.location.reload();
        }
    });
}

delete(utakmicaId) {
    TestAxios.delete('/utakmice/' + utakmicaId)
        .then(res => {
            // handle success
            console.log(res);
            alert('Obrisano!');
            this.deleteFromState(utakmicaId); // ili refresh page-a window.location.reload();
        })
        .catch(error => {
            // handle error
            console.log(error);
            alert('Nije obrisano!');
        });
}


onNumberChange(event) {
    console.log(event.target.value);

    const { name, value } = event.target;
    console.log(name + ", " + value);

    this.setState((state, props) => ({
        number: value}));
}

renderUtakmice() {
    
    return this.state.utakmice.map((utakmica) => {

        return(

            <tr key={utakmica.id}>
                <td>{utakmica.reprezentacijaANaziv}</td>
                <td>{utakmica.reprezentacijaBNaziv}</td>
                <td>{utakmica.brojGolovaA}</td>
                <td>{utakmica.brojGolovaB}</td>
                
                <td>
                    {window.localStorage['role']=='ROLE_ADMIN'?
                    <Col>
                    <Button onClick={()=>this.delete(utakmica.id)}>Obrisi</Button>
                    </Col>:null
                    }
                </td>
               
            </tr>
        
     ) } 
    )
}


render() {
    return (
        <Col>
            <Row><h1 style={{color: "purple"}}>Utakmice</h1></Row>
            
            <br/>
            
            <br/>
                <Row>
                    {window.localStorage['role']=='ROLE_KORISNIK' || 'ROLE_ADMIN'  ?
                    <Col>
                    <Button onClick={()=>this.goToAdd()}>Dodavanje utakmice</Button>
                    </Col>:null
                    }
                </Row>
            <Row>

            
                <Col style={{display:'flex', justifyContent:'right'}}>
                <Button disabled={this.state.pageNo===0} 
                  onClick={()=>this.getUtakmice(this.state.pageNo-1)}
                  className="mr-3">Prev</Button>
                <Button disabled={this.state.pageNo==this.state.totalPages-1} 
                onClick={()=>this.getUtakmice(this.state.pageNo+1)}>Next</Button>
                </Col>
            </Row>

            <Row><Col>
            <Table style={{marginTop: 5}} className="tabela-utakmice">
            <thead>
            <tr>
                <th>Reprezentacija A</th>
                <th>Reprezentacija B</th>
                <th>Golovi A</th>
                <th>Golovi B</th>

               
            </tr>
            </thead>
            <tbody>
                {this.renderUtakmice(0)}
            </tbody>
            </Table>
            </Col></Row>
            
        </Col>
    );
}
}

export default withNavigation(withParams(Utakmice));