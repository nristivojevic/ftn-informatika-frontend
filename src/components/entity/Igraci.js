import React from 'react';
import TestAxios from '../../apis/TestAxios';
import { Row, Col, Button, Table, Form } from 'react-bootstrap'
import './../../index.css';
import { withParams, withNavigation } from '../../routeconf'

class Igraci extends React.Component {

constructor(props) {
    super(props);
    this.state = {
        igraci: [],
        pageNo: 0,
        totalPages: 0,
        search:{
            reprezentacijaId:""
        }
    }
}

componentDidMount() {
    this.getIgraci(0);
}

getIgraci(newPageNo) {
    let config = {
        params: {
            pageNo: newPageNo,
            reprezentacijaId:this.state.search.reprezentacijaId
        }
    }

    TestAxios.get('/igraci', config)
        .then(res => {
            console.log(res);
            this.setState({
                igraci: res.data,
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



deleteFromState(igracId) {
    var igraci = this.state.igraci;
    igraci.forEach((element, index) => {
        if (element.id === igracId) {
            igraci.splice(index, 1);
            this.setState({ igraci: igraci });
        }
    });
}

delete(igracId) {
    TestAxios.delete('/igraci/' + igracId)
        .then(res => {
            // handle success
            console.log(res);
            alert('Igrac je obrisan!');
            this.deleteFromState(igracId);
        })
        .catch(error => {
            // handle error
            console.log(error);
            alert('Niste izbrisali igraca!');
        });
}

izmena(igracId) {
    this.props.navigate('/igraci/izmena/'+igracId);
}

onInputChange(event) {
    const name = event.target.name;
    const value = event.target.value

    let search = this.state.search;
    search[name] = value;

    this.setState({ search })
}


renderSearchForm() {
    return (
        <>
        <Form style={{ width: "100%" }}>

            <Row><Col>
                <Form.Group>
                    <Form.Label>Naziv reprezentacije</Form.Label>
                    <Form.Select name="reprezentacijaId" onChange={(e)=>this.onInputChange(e)}>
                        <option value=""></option>
                        {this.state.igraci.map((igrac)=>{
                            return(
                                <option value={igrac.reprezentacijaId}>{igrac.reprezentacijaNaziv}</option>
                            );
                        })}
                    </Form.Select>
                </Form.Group>
            </Col></Row>

        </Form>
        <Row><Col>
            <Button className="mt-3" onClick={() => this.getIgraci(0)}>Pretraga</Button>
        </Col></Row>
        </>
    );
}
  
renderIgraci() {
    return this.state.igraci.map((igrac) => {

        return (
           
            <tr key={igrac.id}>
                <td>{igrac.ime}</td>
                <td>{igrac.prezime}</td>
                <td>{igrac.postignutiGolovi}</td>
                <td>{igrac.reprezentacijaNaziv}</td>
                <td>
                    {window.localStorage['role']=='ROLE_ADMIN'?
                    <Col>
                    <Button onClick={()=>this.delete(igrac.id)}>Obrisi</Button>
                    </Col>:null
                    }
                </td>
                <td>
               
                    {window.localStorage['role']=='ROLE_ADMIN'?
                    <Col>
                    <Button onClick={()=>this.izmena(igrac.id)}>Izmena golova</Button>
                    </Col>:null
                    }
                
                </td>
            </tr>
        )
                } 
    )
}


render() {
    return (
        <Col>
            <Row><h1 style={{color: "purple"}}>Igraci</h1></Row>
    
            <Row>
                {this.renderSearchForm()}
            </Row>
            <br/>
    
            <Row>
                <Col style={{display:'flex', justifyContent:'right'}}>
                <Button disabled={this.state.pageNo===0} 
                  onClick={()=>this.getIgraci(this.state.pageNo-1)}
                  className="mr-3">Prev</Button>
                <Button disabled={this.state.pageNo==this.state.totalPages-1} 
                onClick={()=>this.getIgraci(this.state.pageNo+1)}>Next</Button>
                </Col>
            </Row>
    
            <Row><Col>
            <Table style={{marginTop: 5}}>
            <thead>
            <tr>
                <th>Ime</th>
                <th>Prezime</th>
                <th>Postignuti golovi</th>
                <th>Reprezentacija</th>
            </tr>
            </thead>
            <tbody>
                {this.renderIgraci(0)}
            </tbody>
            </Table>
            </Col></Row>
            
        </Col>
    );
    }



}

export default withNavigation(withParams(Igraci));