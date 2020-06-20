import API from '../config/config';

/**
 * Student Services
 *
 * Services to call external Api to handler
 * request from diferentes modules
 * @author Maxi Mendoza
 */

const StudentService = {
  // Get All student
  getAllStudent: () => new Promise(
    (resolve, reject) => {
      API.get('/student')
        .then(res => res.data)
        .then(data => resolve(data))
        .catch(error => reject(error));
    }
  ),
  // Create new student
  addStudent: data => new Promise(

    (resolve, reject) => {
      API.post('/student', data)
        .then(res => res.data)
        .then(data => resolve(data))
        .catch(error => reject(error));
    }
  ),
  // Get One Student
  getStudentById: id => new Promise(

    (resolve, reject) => {
      API.get(`/student/${id}`)
        .then(res => res.data.student)
        .then(data => resolve(data))
        .catch(error => reject(error));
    }
  ),
  // Put data student
  updateStudent: (id, data) => new Promise(

    (resolve, reject) => {
      API.put(`/student/${id}`, data)
        .then(res => res.data)
        .then(data => resolve(data))
        .catch(error => reject(error));
    }
  ),
  // disable Student
  deleteStudent: id => new Promise(

    (resolve, reject) => {
      API.delete(`student/${id}`)
        .then(data => resolve(data))
        .catch(error => reject(error));
    }
  ),
  // get Payments Availables
  getPayments: () => new Promise(

    (resolve, reject) => {
      API.get('/payment')
        .then(res => res.data)
        .then(data => resolve(data))
        .catch(error => reject(error));
    }
  )
};
export default StudentService;
