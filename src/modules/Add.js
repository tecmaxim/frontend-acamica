import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import DatePicker from 'react-datepicker/dist/react-datepicker';
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import StudentService from "../services/StudentService"
import Moment from 'moment';
import {
  Button,
  Container,
  FormGroup,
  Col,
  Row,
} from "reactstrap";
import classNames from 'classnames';
import validator from 'validator';

class AddComponent extends React.Component{
  optionItems=[]
  state = {

    id: "",
    name: { value: '', isValid: true, message: '' },
    email: { value: '', isValid: true, message: '' },
    date: { value: "", isValid: true, message: '' },
    career: { value: '', isValid: true, message: '' },
    phone: { value: '', isValid: true, message: '' },
    country: { value: '', isValid: true, message: '' },
    city: { value: '', isValid: true, message: '' },
    selectPayment:"",
    selectInstallments:"",
    paymentMethod:{
      id:"",
      description:"",
      installments:""
    },
    payments:[],
    installments:[],
    showingInstallments: false,
};

  optionsInstallments=[];

  componentDidMount(){
      this.getPayments()
 }

  getPayments = ()=>{
    StudentService.getPayments()
    .then( data => {
      let options = data.map(
        p => ({ value: p.id, label: p.description })
      );

      data.forEach(
         p => { this.optionsInstallments[p.id] = JSON.parse(p.installments)});
         
         this.setState({
            payments : options
          })
  
    }).catch((error) => {
      console.log(error);
    });
  }

  insert= ()=>{
    this.resetValidationStates();
    
    if(this.formIsValid()){
      const modify = this.state
      const st = {
        name: modify.name.value,
        email:modify.email.value ,
        birthday: modify.date.value,
        career: modify.career.value,
        phone:modify.phone.value ,
        country: modify.country.value,
        city: modify.city.value
      }

      const payment = {
        idPayment:modify.paymentMethod.id,
        description:modify.paymentMethod.description,
        installments:modify.paymentMethod.installments
      }
      const data =  {
        student: st,
        paymentMethod:payment
      };

    StudentService.addStudent(data)
      .then((res) => {
        this.props.history.push('/');
      })
      .catch((error) => {
        console.log(error);
      })
    }
}

  handleChange = (e) => {
    const state = {
      ...this.state,
      [e.target.name]: {
        ...this.state[e.target.name],
        value: e.target.value,isValid: true,message:""
      }
    };
    this.setState(state);
  }

  handleChangeSelectPayment = (e) => {

    var paymentMethod = {...this.state.paymentMethod}
    paymentMethod.id = e.value;
    paymentMethod.description = e.label;
    paymentMethod.installments = null;
    this.setState({paymentMethod})

    var installments = this.optionsInstallments[e.value]

    if(installments){
      let options = installments.map( p => ({ value: p, label: p}));
      this.setState({
        installments:options,
        showingInstallments: true
      });
    } else {
     this.setState({
       installments: [],
       showingInstallments: false
      });
    }
  };

  handleChangeSelectInstallments= (e) => {
    var paymentMethod = {...this.state.paymentMethod}

    paymentMethod.installments = e.value;

    this.setState({paymentMethod})
  };



  handleChangeDate = (e) => {
    const dateFormat= Moment(e).format('YYYY-MM-DD')
    const state = {
      ...this.state,
      date: {
        ...this.state.date,
        value: dateFormat,isValid: true,message:""
      }
    };

    this.setState(state);
  };

  
  formIsValid = () => {
    const email = this.state.email 
    const name = this.state.name 
    const date = this.state.date 
    const career = this.state.career 
    const country = this.state.country 
    const city = this.state.city
    const phone = this.state.phone
    let isGood = true;

    if (!validator.isEmail(email.value)) {
      email.isValid = false;
      email.message = 'Email invalido';
      isGood = false;
    }

    if (validator.isEmpty(name.value)) {
      name.isValid = false;
      name.message = 'Name no puede ser vacio';
      isGood = false;
    }
    if (validator.isEmpty(date.value)) {
      date.isValid = false;
      date.message = 'Date no puede ser vacio';
      isGood = false;
    }
    if (validator.isEmpty(career.value)) {
      career.isValid = false;
      career.message = 'Career no puede ser vacio';
      isGood = false;
    }
    if (validator.isEmpty(country.value)) {
      country.isValid = false;
      country.message = 'Country no puede ser vacio';
      isGood = false;
    }
    if (validator.isEmpty(city.value)) {
      city.isValid = false;
      city.message = 'City no puede ser vacio';
      isGood = false;
    }
    if (validator.isEmpty(phone.value)) {
      phone.isValid = false;
      phone.message = 'Phone no puede ser vacio';
      isGood = false;
    }


    if (!isGood) {
      this.setState({
        email, name, date, career, country, city, phone
      });
    }

    return isGood;
  }

  resetValidationStates = () => {
    // make a copy of everything in state
    const state = JSON.parse(JSON.stringify(this.state));

    Object.keys(state).forEach(key => {
      if (state[key].hasOwnProperty('isValid')) {
        state[key].isValid = true;
        state[key].message = '';
      }
    });

    this.setState(state);
  }

 render(){
  const { email,name,career,date,country,city,phone } = this.state;

  const emailGroupClass = classNames('form-group',
          { 'has-error': !email.isValid }
        );
  const nameGroupClass = classNames('form-group',
          { 'has-error': !name.isValid }
        );
  const careerGroupClass = classNames('form-group',
          { 'has-error': !career.isValid }
        );
  const dateGroupClass = classNames('form-group',
          { 'has-error': !date.isValid }
        );
  const countryGroupClass = classNames('form-group',
          { 'has-error': !country.isValid }
        );
  const cityGroupClass = classNames('form-group',
          { 'has-error': !city.isValid }
        );
  const phoneGroupClass = classNames('form-group',
        { 'has-error': !phone.isValid }
      );      
   return (
   
    <Container>
    <Row>
        <Col>  
          <Container>

        <FormGroup className={nameGroupClass}>
          <label>
            Name: 
          </label>
          <input
            className="form-control"
            name="name"
            value={this.state.name.value}
            type="text"
            onChange={this.handleChange}
          />
            <span className="help-block">{name.message}</span>
        </FormGroup>
        
        <FormGroup className={emailGroupClass}>
          <label>
            Email: 
          </label>
          <input
            className="form-control"
            name="email"
            value={this.state.email.value}
            type="text"
            onChange={this.handleChange}
          />
           <span className="help-block">{email.message}</span>
        </FormGroup>
        <FormGroup className={careerGroupClass}>
          <label>
            Career: 
          </label>
          <input
            className="form-control"
            name="career"
            type="text"
            value={this.state.career.value}
            onChange={this.handleChange}
          />
           <span className="help-block">{career.message}</span>
        </FormGroup>
          </Container>
        </Col>

      <Col>  
        <Container>

              <FormGroup className={dateGroupClass}>
          <label>
            Date: 
          </label><br></br>
              <DatePicker
                  onChange={(date) => this.handleChangeDate(date)}
                  value={this.state.date.value}
                  name="date"      
                  dateFormat="YYYY-MM-DD"
                />  <br></br>
                 <span className="help-block">{date.message}</span>
        </FormGroup>
        <FormGroup className={countryGroupClass}>
          <label>
            Country: 
          </label>
          <input
            className="form-control"
            name="country"
            value={this.state.country.value}
            type="text"
            onChange={this.handleChange}
          />
           <span className="help-block">{country.message}</span>
        </FormGroup>
        <FormGroup className={cityGroupClass}>
          <label>
            City: 
          </label>
          <input
            className="form-control"
            name="city"
            value={this.state.city.value}
            type="text"
            onChange={this.handleChange}
          />
           <span className="help-block">{city.message}</span>
        </FormGroup>

        <FormGroup className={phoneGroupClass}>
          <label>
            Phone: 
          </label>
          <input
            className="form-control"
            name="phone"
            value={this.state.phone.value}
            type="text"
            onChange={this.handleChange}
          />
           <span className="help-block">{phone.message}</span>
        </FormGroup>

        </Container>
      </Col>

    
      </Row>
      <Row>
      <Col>
        <Container>
                <FormGroup>
                        <label>
                        Payments:
                        </label>
                        <Select
                  name="payments"
                  onChange={this.handleChangeSelectPayment}
                  options={this.state.payments}  
                               
                />
          
              </FormGroup>
        </Container>
        </Col>
        <Col>
        <Container>
                <FormGroup style={{ display: (this.state.showingInstallments ? 'block' : 'none') }}>
                        <label>
                        installments:
                        </label>
                        <Select
                  name="installments"                  
                  onChange={this.handleChangeSelectInstallments}
                  options={this.state.installments}                  
                />
          
              </FormGroup>
        </Container>
        </Col>
      </Row>
      <Row>
      <Col>            
      <Button
              color="primary"
              onClick={() => this.insert()}
            >
              Add
            </Button>
            </Col>
            <Col>
            <Button
              className="btn btn-danger"
              onClick={() =>  this.props.history.push('/')}
            >
              Cancelar
       </Button>
            </Col>
            
      </Row>
    </Container>
   );
 }
}


export default AddComponent;