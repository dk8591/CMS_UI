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
import { verifyToken } from '../../store/Action/Token/verifytoken'
import Settings from '../../config/globalConfig';
import Button from 'react-bootstrap/esm/Button';
import Addpost from './Addpost';
import Modal from 'react-bootstrap/esm/Modal';
import Updatepost from './Updatepost';
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
class Blogentrylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: [],
            showaddpost: false,
            id: '',
            showupdateuser: false,
            columnDefs: [
                { title: 'Title', field: 'blogheading', width: 100 },
                {
                    title: 'Created Date', field: 'lastname', sortable: true, width: 100,
                    render: (params) => {
                        const date = new Date(params.createddate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            day: '2-digit',
                            month: '2-digit'
                        });
                        return date;
                    },
                },


            ],
        }
    }
    componentDidMount() {
        this.props.verifyToken()
        this.getentries()
    }
    static getDerivedStateFromProps(props, state) {
        console.log(props)
        if (props.token.length <= 0) {
            props.history.push("/Login")
        }

    }
    getentries = () => {
        axios
            .get(`${apiUrl}/allblogentries`)
            .then(response => response.data)
            .then(
                result => {

                    console.log(result);
                    this.setState({
                        entries: result.data

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

            showupdateuser: true
        })

    }
    delete = entryid => {
        axios
            .delete(`${apiUrl}/deleteentry/${entryid}`)
            .then(response => response.data)
            .then(
                result => {
                    const beforedelete = _.cloneDeep(this.state.entries);
                    const id = beforedelete.find(f => f.id === entryid);
                    const index = beforedelete.indexOf(id);
                    beforedelete.splice(index, 1);
                    this.setState({ entries: beforedelete })

                },
                err => {
                    console.log(err);
                }
            );
    }
    showaddpost = () => {
        this.setState({
            showaddpost: true
        })
    }
    hideaddpost = () => {
        this.setState({
            showaddpost: false
        })
    }


    hideupdatepost = () => {
        this.setState({
            showupdateuser: false
        })
    }
    render() {
        const { columnDefs, entries, showaddpost, showupdateuser, id } = this.state
        return (
            <div className="w-100">
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
                                            <Button color="primary" onClick={this.showaddpost}>
                                                Add Blog Entry
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

                                searchTooltip: 'Search  Blog Entries here',
                                searchPlaceholder: 'Search  Blog Entries'
                            }
                        }}
                        title="Blog Entries List"

                        columns={columnDefs}
                        data={entries}
                        icons={tableIcons}
                        actions={[
                            {
                                icon: tableIcons.Edit,
                                tooltip: 'Edit Blog Entry',
                                onClick: (event, rowData) => this.edit(rowData.id)
                            },
                            rowData => ({
                                icon: tableIcons.Delete,
                                tooltip: 'Delete Blog Entry',
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
                    show={showaddpost}
                    onHide={this.hideaddpost}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header className="text-center" closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" className="text-center">
                            Add User
        </Modal.Title>
                    </Modal.Header>
                    <Addpost
                        transfer={{
                            close: this.hideaddpost.bind(this),
                            get: this.getentries.bind(this)
                        }}

                    />
                </Modal>
                <Modal
                    show={showupdateuser}
                    onHide={this.hideupdatepost}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header className="text-center" closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" className="text-center">
                            Update Blog Entry
        </Modal.Title>
                    </Modal.Header>
                    <Updatepost
                        id={id}
                        transfer={{
                            close: this.hideupdatepost.bind(this),
                            get: this.getentries.bind(this)
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

export default withRouter(connect(mapStateToProps, { verifyToken })(Blogentrylist));