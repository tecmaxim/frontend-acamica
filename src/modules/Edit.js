import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Select from 'react-select';
import DatePicker from 'react-datepicker/dist/react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import StudentService from "../services/StudentService"
import Moment from 'moment';
import
{
  Container,
  FormGroup,
  Col,
  Row,
  Button
}
from "reactstrap";
import classNames from 'classnames';
import validator from 'validator';

class EditComponent extends React.Component
{
  optionItems = []
  state = {
    id: "",
    name:
    {
      value: '',
      isValid: true,
      message: ''
    },
    email:
    {
      value: '',
      isValid: true,
      message: ''
    },
    date:
    {
      value: new Date(),
      isValid: true,
      message: ''
    },
    career:
    {
      value: '',
      isValid: true,
      message: ''
    },
    phone:
    {
      value: 0,
      isValid: true,
      message: ''
    },
    country:
    {
      value: '',
      isValid: true,
      message: ''
    },
    city:
    {
      value: '',
      isValid: true,
      message: ''
    },
    selectPayment: "",
    selectInstallments: "",
    paymentMethod:
    {
      id: "",
      description: "",
      installments: ""
    },
    payments: [],
    installments: [],
    showingInstallments: false,
  };

  optionsInstallments = [];

  componentDidMount()
  {
    const id = this.props.location.state.id
    this.setState(
    {
      id: id
    })
    this.showUpdate(id)


  }

  showUpdate = (id) =>
  {

    StudentService.getStudentById(id)
      .then(data =>
      {
        let paymentMethod = { ...this.state.paymentMethod
        }
        let name = { ...this.state.name
        }
        let email = { ...this.state.email
        }
        let date = { ...this.state.date
        }
        let career = { ...this.state.career
        }
        let phone = { ...this.state.phone
        }
        let city = { ...this.state.city
        }
        let country = { ...this.state.country
        }
        let notShow = paymentMethod.installments ? true : false
        name.value = data.name
        email.value = data.email
        date.value = Moment(date.birthday).format('YYYY-MM-DD')
        career.value = data.career
        phone.value = data.phone
        city.value = data.city ? data.city : ""
        country.value = data.country
        paymentMethod.id = data.paymentMethod.id
        paymentMethod.description = data.paymentMethod.description
        paymentMethod.installments = data.paymentMethod.installments
        this.setState(
        {
          id: data.id,
          name,
          email,
          date,
          career,
          phone,
          city,
          country,
          showingInstallments: !notShow,
          paymentMethod
        });
        this.getPayments()

      })
  };


  getPayments = () =>
  {
    StudentService.getPayments()
      .then(data =>
      {

        let options = data.map(p => (
        {
          value: p.id,
          label: p.description
        }));
        data.forEach(p =>
        {
          this.optionsInstallments[p.id] = JSON.parse(p.installments)
        });


        var installments = this.optionsInstallments[this.state.paymentMethod.id]

        if (installments)
        {

          let options = installments.map(p => (
          {
            value: p,
            label: p
          }));

          this.setState(
          {
            installments: options,
            showingInstallments: true
          });

        }
        else
        {
          this.setState(
          {
            installments: [],
            showingInstallments: false
          });
        }

        this.setState(
        {
          payments: options
        })
      })

  }

  update = () =>
  {
    this.resetValidationStates();

    if (this.formIsValid())
    {
      const modify = this.state
      const st = {
        name: modify.name.value,
        email: modify.email.value,
        birthday: modify.date.value,
        career: modify.career.value,
        phone: modify.phone.value,
        country: modify.country.value,
        city: modify.city.value
      }

      const payment = {
        idPayment: modify.paymentMethod.id,
        description: modify.paymentMethod.description,
        installments: modify.paymentMethod.installments
      }
      const data = {
        student: st,
        paymentMethod: payment
      };

      StudentService.updateStudent(modify.id, data)
        .then((res) =>
        {
          this.props.history.push('/');
        })
        .catch((error) =>
        {
          console.log(error);
        });
    }
  };


  handleChange = (e) =>
  {
    const state = {
      ...this.state,
      [e.target.name]:
      {
        ...this.state[e.target.name],
        value: e.target.value,
        isValid: true,
        message: ""
      }
    };

    this.setState(state);

  }

  handleChangeSelectPayment = (e) =>
  {
    var paymentMethod = { ...this.state.paymentMethod
    }
    paymentMethod.id = e.value;
    paymentMethod.description = e.label;
    paymentMethod.installments = null;
    this.setState(
    {
      paymentMethod
    })
    var installments = this.optionsInstallments[e.value]

    if (installments)
    {
      let options = installments.map(p => (
      {
        value: p,
        label: p
      }));
      this.setState(
      {
        installments: options,
        showingInstallments: true
      });

    }
    else
    {
      this.setState(
      {
        installments: [],
        showingInstallments: false
      });
    }

  };

  handleChangeSelectInstallments = (e) =>
  {
    var paymentMethod = { ...this.state.paymentMethod
    }

    paymentMethod.installments = e.value;

    this.setState(
    {
      paymentMethod
    })

  };


  handleChangeDate = (e) =>
  {

    const dateFormat = Moment(e).format('YYYY-MM-DD')
    const state = {
      ...this.state,
      date:
      {
        ...this.state.date,
        value: dateFormat,
        isValid: true,
        message: ""
      }
    };

    this.setState(state);

  };

  formIsValid = () =>
  {
    const email = this.state.email;
    const name = this.state.name;
    const date = this.state.date;
    const career = this.state.career;
    const country = this.state.country;
    const city = this.state.city;
    const phone = this.state.phone;
    let isGood = true;

    if (!validator.isEmail(email.value))
    {
      email.isValid = false;
      email.message = 'Email invalido';
      isGood = false;
    }

    if (validator.isEmpty(name.value))
    {
      name.isValid = false;
      name.message = 'Name no puede ser vacio';
      isGood = false;
    }
    if (validator.isEmpty(date.value))
    {
      date.isValid = false;
      date.message = 'Date no puede ser vacio';
      isGood = false;
    }
    if (validator.isEmpty(career.value))
    {
      career.isValid = false;
      career.message = 'Career no puede ser vacio';
      isGood = false;
    }
    if (validator.isEmpty(country.value))
    {
      country.isValid = false;
      country.message = 'Country no puede ser vacio';
      isGood = false;
    }
    if (validator.isEmpty(city.value))
    {
      city.isValid = false;
      city.message = 'City no puede ser vacio';
      isGood = false;
    }
    /* if (validator.IsEmpty(phone.value)) {
       phone.isValid = false;
       phone.message = 'Phone no puede ser vacio';
       isGood = false;
     }*/


    if (!isGood)
    {
      this.setState(
      {
        email,
        name,
        date,
        career,
        country,
        city,
        phone
      });
    }

    return isGood;
  }

  resetValidationStates = () =>
  {
    // make a copy of everything in state
    const state = JSON.parse(JSON.stringify(this.state));
    Object.keys(state).forEach(key =>
    {
      if (state[key].hasOwnProperty('isValid'))
      {
        state[key].isValid = true;
        state[key].message = '';
      }
    });

    this.setState(state);
  }

  resetForm = () =>
  {
    this.setState(...this.state);
  }

  render()
  {
    const
    {
      email,
      name,
      career,
      date,
      country,
      city,
      phone
    } = this.state;

    const emailGroupClass = classNames('form-group',
    {
      'has-error': !email.isValid
    });
    const nameGroupClass = classNames('form-group',
    {
      'has-error': !name.isValid
    });
    const careerGroupClass = classNames('form-group',
    {
      'has-error': !career.isValid
    });
    const dateGroupClass = classNames('form-group',
    {
      'has-error': !date.isValid
    });
    const countryGroupClass = classNames('form-group',
    {
      'has-error': !country.isValid
    });
    const cityGroupClass = classNames('form-group',
    {
      'has-error': !city.isValid
    });
    const phoneGroupClass = classNames('form-group',
    {
      'has-error': !phone.isValid
    });


    return (
      <Container>
      <Row>
        <Col>
          <Container>
            <FormGroup>
              <input
                      className="form-control"
                      readOnly
                      type="text"
                      value={this.state.id}
                    />
            </FormGroup>
            <FormGroup className={nameGroupClass}>
              <label>
                      Name: 
                    </label>
              <input
                      className="form-control"
                      name="name"
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.name.value}
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
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.email.value}
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
                      onChange={this.handleChange}
                      value={this.state.career.value}
                    />
              <span className="help-block">{career.message}</span>
            </FormGroup>
            <FormGroup className={phoneGroupClass}>
              <label>
                      Career: 
                    </label>
              <input
                      className="form-control"
                      name="phone"
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.phone.value}
                    />
              <span className="help-block">{phone.message}</span>
            </FormGroup>
          </Container>
        </Col>
        <Col>
          <Container>
            <FormGroup className={dateGroupClass}>
              <label>
                      Date: 
                    </label>
              <br></br>
              <DatePicker
                    onChange={(date) => this.handleChangeDate(date)}
                    value={this.state.date.value}
                    name="date"      
                    dateFormat="YYYY-MM-DD"
                   />
              <span className="help-block">{date.message}</span>
            </FormGroup>
            <FormGroup className={countryGroupClass}>
              <label> 
                      Country: 
                    </label>
              <input
                      className="form-control"
                      name="country"
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.country.value}
                    />
              <span className="help-block">{country.message}</span>
            </FormGroup>
            <FormGroup className={cityGroupClass}>
              <label>
                    city: 
                    </label>
              <input
                      className="form-control"
                      name="city"
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.city.value}
                    />
              <span className="help-block">{city.message}</span>
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
                      value={this.state.payments.find(op => {
                        return op.value === this.state.paymentMethod.id
                     })}
       
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
                      value={this.state.installments.find(op => {
                        return op.value === this.state.paymentMethod.installments
                     })}                
                    />
            </FormGroup>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
                  color="primary"
                  onClick={() => this.update()}
                >
                  Update
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


export default EditComponent;