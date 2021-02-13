import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

import MaterialTable, { MTableToolbar } from 'material-table';
import { forwardRef } from 'react';
import {
    AddBox
    , ArrowDownward
    , Check
    , ChevronLeft
    , ChevronRight
    , Clear
    , DeleteOutline
    , Edit
    , FilterList
    , FirstPage
    , LastPage
    , Remove
    , SaveAlt
    , Search
    , ViewColumn
} from '@material-ui/icons';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { verifyToken } from '../../store/Action/Token/verifytoken';
import Settings from '../../config/globalConfig';
import Button from 'react-bootstrap/esm/Button';
import Useradd from './Useradd';
import Modal from 'react-bootstrap/esm/Modal';
import Userupdate from './Userupdate';
import Header from '../Header';

const apiUrl = Settings.API_ROOT;
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
class Userlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userlist: [],
            showuser: false,
            id: '',
            updateuser: false,
            columnDefs: [
                { title: 'First Name', field: 'firstname', width: 100 },
                { title: 'Last Name', field: 'lastname', sortable: true, width: 100 },
                { title: 'Role', field: 'role', sortable: true, width: 100 },
                { title: 'Email', field: 'emailid', sortable: true, width: 170 }

            ],
        }
    }
    componentDidMount() {
        this.props.verifyToken()
        this.getusers()
    }
    static getDerivedStateFromProps(props, state) {
        console.log(props)
        if (props.token.length <= 0) {
            props.history.push("/Login")
        }

    }
    getusers = () => {
        axios
            .get(`${apiUrl}/allusers`)
            .then(response => response.data)
            .then(
                result => {

                    console.log(result);
                    this.setState({
                        userlist: result.data

                    });

                },
                err => {
                    console.log(err);
                }
            );
    }
    edit = id => {

        this.setState({
            id: id,

            updateuser: true
        })

    }
    delete = userid => {
        axios
            .delete(`${apiUrl}/deleteuser/${userid}`)
            .then(response => response.data)
            .then(
                result => {
                    const beforedelete = _.cloneDeep(this.state.userlist);
                    const id = beforedelete.find(f => f.id === userid);
                    const index = beforedelete.indexOf(id);
                    beforedelete.splice(index, 1);
                    this.setState({ userlist: beforedelete })

                },
                err => {
                    console.log(err);
                }
            );
    }
    adduser = () => {
        this.setState({
            showuser: true
        })
    }
    hideuser = () => {
        this.setState({
            showuser: false
        })
    }


    hideupdateuser = () => {
        this.setState({
            updateuser: false
        })
    }
    render() {
        const { columnDefs, userlist, showuser, updateuser, id } = this.state
        return (
            <div className="w-100" >
                <div className="w-100 d-flex justify-content-end">

                    <Header />
                </div>
                <div className="align">
                    <MaterialTable
                        components={{
                            Toolbar: props => (
                                <div>
                                    <MTableToolbar {...props} />
                                    <div style={{
                                        padding: '0px 10px', flexFlow: 'row',
                                        display: 'flex',
                                        justifyContent: 'flex-end'
                                    }}>
                                        <div className="w-full float-right flex justify-end">
                                            <Button color="primary" onClick={this.adduser}>
                                                Add User
							</Button>
                                        </div>
                                    </div>
                                </div>
                            )

                        }}

                        localization={{
                            pagination: {
                                labelRowsPerPage: '{25, 50, 100, 200}',
                                labelDisplayedRows: 'Page {from}-{to} of {count}'
                            },
                            toolbar: {

                                searchTooltip: 'Search  User here',
                                searchPlaceholder: 'Search  User'
                            }
                        }}
                        title="User List"

                        columns={columnDefs}
                        data={userlist}
                        icons={tableIcons}
                        actions={[
                            {
                                icon: tableIcons.Edit,
                                tooltip: 'Edit User',
                                onClick: (event, rowData) => this.edit(rowData.id)
                            },
                            rowData => ({
                                icon: tableIcons.Delete,
                                tooltip: 'Delete User',
                                onClick: (event, rowData) => this.delete(rowData.id),

                            })
                        ]}

                        options={{
                            actionsColumnIndex: -1,
                            search: true,
                            emptyRowsWhenPaging: false,
                            sorting: true,
                            thirdSortClick: false,
                            pageSize: 10,
                            pageSizeOptions: [10, 25, 50],


                        }}
                    />
                </div>
                <Modal
                    show={showuser}
                    onHide={this.hideuser}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header className="text-center" closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" className="text-center">
                            Add User
        </Modal.Title>
                    </Modal.Header>
                    <Useradd
                        transfer={{
                            close: this.hideuser.bind(this),
                            get: this.getusers.bind(this)
                        }}

                    />
                </Modal>
                <Modal
                    show={updateuser}
                    onHide={this.hideupdateuser}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header className="text-center" closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" className="text-center">
                            Update User
        </Modal.Title>
                    </Modal.Header>
                    <Userupdate
                        id={id}
                        transfer={{
                            close: this.hideupdateuser.bind(this),
                            get: this.getusers.bind(this)
                        }}

                    />
                </Modal>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    token: state.reducer1.token

})

export default withRouter(connect(mapStateToProps, { verifyToken })(Userlist));