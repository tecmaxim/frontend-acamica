import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import StudentService from "../services/StudentService"
import Moment from 'moment';
import
{
  Table,
  Button,
  Container
}
from "reactstrap";

class listComponent extends React.Component
  {
    state = {
      data: [],
    };
    componentDidMount()
    {
      this.list()
    }
    // Delete an studemt
    delete = (id) =>
    {
      var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento " + id);
      if (opcion === true)
      {
        StudentService.deleteStudent(id)
          .then((res) =>
          {
            this.list()
          })
          .catch((error) =>
          {
            console.log(error);
          });
      }
    };
    // List All students with options
    list = () =>
    {
      StudentService.getAllStudent()
        .then(res =>
        {
          this.setState(
          {
            data: res
          })

        }).catch((error) =>
        {
          console.log(error);
        });

    }
    // View And Update Student
    showUpdate(id)
    {
      this.props.history.push(
      {
        pathname: '/edit/' + id,
        state:
        {
          id: id
        }
      });
    }
    render() 
    {
      return (
      // HTML

      <Container>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>name</th>
                  <th>Email</th>
                  <th>Career</th>
                  <th>Date</th>
                  <th>Country</th>
                  <th>City</th>
                  <th>Payment</th>
                  <th>installments</th>
                </tr>
              </thead>
  
              <tbody>
               {this.state.data.map((dato) => (
                  <tr key={dato.id}>
                    <td>{dato.id}</td>
                    <td>{dato.name}</td>
                    <td>{dato.email}</td>
                    <td>{dato.career}</td>
                    <td>{Moment(dato.birthday).format('YYYY-MM-DD')  }</td>
                    <td>{dato.country}</td>
                    <td>{dato.city}</td>
                    <td>{dato.description}</td>
                    <td>{dato.installments}</td>
                    <td>
                      <Button
                        color="primary"
                        onClick={() => this.showUpdate(dato.id)}
                      >
                        Editar
                      </Button>{" "}
                      <Button color="danger" onClick={()=> this.delete(dato.id)}>Eliminar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
          );
        }
      }
    
    export default listComponent;