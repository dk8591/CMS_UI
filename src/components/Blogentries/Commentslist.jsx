import React, { Component } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import{ AddBox 
 ,ArrowDownward 
 ,Check 
 ,ChevronLeft 
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
, ViewColumn }from '@material-ui/icons';
import { withRouter } from "react-router-dom";
import {connect } from 'react-redux';
import {verifyToken} from '../../store/Action/Token/verifytoken'
import Settings from '../../config/globalConfig';
import Button from 'react-bootstrap/esm/Button';
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
class Commentslist extends Component {
    constructor(props) {
        super(props);
    this.state={
        entries:[],
       
        id:'',
       
        columnDefs: [
            { title: 'Comment',	field: 'comment'	,width: 100 ,
            
        },
             { title: 'Status',	field: 'status', sortable: true, width: 100,
             render: rowData => <Button variant={rowData.status===true?'danger':'secondary'} onClick={()=>this.setstatus(rowData)}>{rowData.status===true?'Block':'Approve'}</Button>
            },
           

          ],
    }
}
componentDidMount(){
    this.props.verifyToken()
  this.getallcomments()
}
static getDerivedStateFromProps(props, state) {
    console.log(props)
    if(props.token.length<=0){
props.history.push("/Login")
    }
    
}
getallcomments=()=>{
    axios
    .get(`${apiUrl}/allcomments`)
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

setstatus=(data)=>{
    const params={
        id:data.id,
        status:!data.status
    }
    axios
    .put(`${apiUrl}/updatecomment`,params)
    .then(response => response.data)
    .then(
        result => {
         
            console.log(result);
            this.setState({
                entries: result.data

            });
            this.getallcomments()
        },
        err => {
            console.log(err);
        }
    );
}
    render() {
        const {columnDefs,entries}=this.state
        return (
            <div className="w-100">
                 <div className="w-100 d-flex justify-content-end">
                
                   <Header />
                </div>
                <div className="align">
                <MaterialTable					
							
					
						localization={{							
							pagination: {							
							  labelRowsPerPage:'{25, 50, 100, 200}',
							 labelDisplayedRows: 'Page {from}-{to} of {count}'
							},
							toolbar: {							
													
								searchTooltip: 'Search Comments here',
								searchPlaceholder: 'Search Comments'
							}
						}}
						title="Comments List"				
						
							columns={columnDefs}
							data={entries}
                            icons={tableIcons}
                        
							options={{
                                actionsColumnIndex: -1,
								search: true, 								
								emptyRowsWhenPaging:false,
								sorting: true,
								thirdSortClick:false,														
								pageSize:10,
								pageSizeOptions : [10,25,50],
							

							}}
		/>
        </div>
            </div>
        );
    }
}


const mapStateToProps=(state)=>({
    token:state.reducer1.token
  
})

export default withRouter(connect(mapStateToProps,{verifyToken}) (Commentslist));