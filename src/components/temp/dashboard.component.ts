import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { AppComponent } from '../app.component';
import { AppConfiguration } from '../app-config';
import { LoginService, User } from '../login/login.service';
import { CommonService } from '../common.service';
import { AuthGuard } from '../gaurds/auth-guard.service';
import { IMyDpOptions, IMyOptions, IMyDateModel, IMyDate } from "mydatepicker";

/**
 * <h1>dashboard.component.ts</h1>
 * @author Gobinath J
 */

@Component({
    selector: 'dashboard-comp',
    templateUrl: './dashboard.component.html',
    styleUrls: ['../attendance/attendancedetails.component.css']
})
export class DashboardComponent {
    totalupdatedleave: any;
    totalpreviousleave: any;
    leavecurrentdate: string;
    leaveupdatedate: any;
    UpdatedPL: any;
    UpdatedSL: any;
    UpdatedCL: any;
    pPL: any;
    pSL: any;
    pCL: any;
    leaveUpdateDetailsjson: any;
    showDialog5: boolean;
    empprojectname: any;
    private NoOfDaysControl: boolean = false;
    private duplicateDaysControl: boolean = false;
    private FreezeDaysControl: boolean = false;
    private LeaveAlreadyAppliedControl: boolean = false;
    submitAttempt = false;
    submit() {
    }
    disableEntry: true
    private startDate: IMyOptions = {
        // start date options here...
    }
    private endDate: IMyOptions = {
        // other end date options here...
        dateFormat: 'dd/mm/yyyy',
        showClearDateBtn: false,
        disableUntil: { year: 0, month: 0, day: 0 },
        disableWeekends: false
    }

    startDateEpoc: number; startDateEpocFixed: number; endDateEpoc: number; endDateEpocDF: number; startDateEpocDF: number; saturdayCheck: number
    startDateTime: Date; endDateTime: Date; startDateTimeNew: Date;
    NewDays: number; days: any;
    noOfSundays: number; noOfWeekendDays: number; noOfHolidays: number;
    startDayNumber: number; endDayNumber: number;
    NoOfDaysControl1: boolean = false; ToggleButton: boolean = false;
    disabled: boolean = true; CompLeave: any; ClNew: number; PlNew: number; SlNew: number;
    PatNew: number; TotalClPlSl: number;
    private NoOfDaysRequired: boolean = false;
    private dateOut;
    public reEnterPassword;
    public valid;
    private getDd: String;
    private holidayDd: String;
    private checkNumberOfdays: number;
    private freezeDate: number;
    private freezeDateCheck: number;
    private reslength: any;
    public presentDate: any;
    public getProject: any;
    public empId;
    @Input() halfhour: any = 16200000;
    @Input() fullhour: any = 32400000;
    onStartDateChanged(event: IMyDateModel) {
        this.ToggleButton = false;
        this.startDateTime = new Date(event.jsdate.getTime());
        this.startDateTimeNew = new Date(event.jsdate.getTime());
        let s = new Date(event.jsdate.getTime()).valueOf();
        this.startDateEpoc = s;
        this.startDateEpocFixed = s;
        // set previous of selected date
        this.startDateTime.setDate(this.startDateTime.getDate() - 1);


        // Get new copy of options in order the date picker detect change
        let copy: IMyOptions = this.getCopyOfEndDateOptions();
        copy.disableUntil = {
            year: this.startDateTime.getFullYear(),
            month: this.startDateTime.getMonth() + 1,
            day: this.startDateTime.getDate()
        };
        this.endDate = copy;
        this.disabled = false;
        this.applyLeaveToDate = '';
        this.noofdays = '';
    }
    current: any;
    onEndDateChanged(event: IMyDateModel) {
        this.ToggleButton = false;
        // end date changed...
        this.endDateTime = new Date(event.jsdate.getTime());
        this.endDayNumber = this.endDateTime.getDay();
        let d: number = new Date(event.jsdate.getTime()).valueOf();

        this.endDateEpoc = d;
        this.startDateEpoc = this.startDateEpocFixed;
        this.noOfSundays = 0; this.noOfWeekendDays = 0; this.noOfHolidays = 0; this.saturdayCheck = 0;
        this.startDateEpocDF = this.startDateEpocFixed;
        this.endDateEpocDF = d;
        this.dateDiff();
        this.dateFreeze();

    }

    dateDiff() {
        let dayMilliseconds = 1000 * 60 * 60 * 24;
        this.startDayNumber = 0; this.endDayNumber = 0;
        while (this.startDateEpoc <= this.endDateEpoc) {
            this.startDayNumber = (new Date(this.startDateEpoc)).getDay();
            this.getDd = (new Date(this.startDateEpoc)).getDate() + "/" + ((new Date(this.startDateEpoc)).getMonth() + 1) + "/" + (new Date(this.startDateEpoc)).getFullYear();
            if (this.startDayNumber == 0) {
                this.noOfSundays++;
            }
            if (this.holidayDetails) {
                for (let i = 0; i < this.holidayDetails.length; i++) {
                    this.holidayDates = new Date(this.holidayDetails[i].holidayDate);
                    this.holidayDd = this.holidayDates.getDate() + "/" + (this.holidayDates.getMonth() + 1) + "/" + this.holidayDates.getFullYear();

                    if (this.getDd == this.holidayDd) {
                        if (this.startDayNumber == 1 || this.startDayNumber == 2 || this.startDayNumber == 3 || this.startDayNumber == 4 || this.startDayNumber == 5) {
                            this.noOfHolidays++;
                        }
                    }
                }
            }
            this.startDateEpoc = this.startDateEpoc + dayMilliseconds;
        }

        this.noOfWeekendDays = this.noOfSundays * 2;
        this.days = (this.endDateEpoc - this.startDateEpocFixed) / dayMilliseconds;
        this.NewDays = this.days + 1;
        this.noofdays = this.NewDays - this.noOfWeekendDays - this.noOfHolidays;
        this.checkNumberOfdays = this.noofdays;
    }

    getCopyOfEndDateOptions(): IMyOptions {
        return JSON.parse(JSON.stringify(this.endDate));
    }

    public Numberofdays: number;
    navSelected($event) {
        this.NoOfDaysControl = false;
        this.LeaveAlreadyAppliedControl = false;
    }

    StartDateControl1: string;
    EndDateControl: string;
    leave: string;
    name: string;
    name1: string;
    clear() {
        this.applyLeaveFromDate = '';
        this.applyLeaveToDate = '';
        this.Type = 'CL/SL/PL';
        this.noofdays = '';
        this.reason = '';
        this.disabled = true;
        this.NoOfDaysControl = false;
        this.LeaveAlreadyAppliedControl = false;
        this.submitAttempt = false;
        this.showDialog2 = !this.showDialog2;
        this.saturdayCheck = 0;
    }

    empname: string; designation: string; empid: string; mailid: string; team: string; mobileNo: string; bloodgroup: string; profileImage: string;
    dateIn: any; timeIn: any; authorise: string; timeOut: string;
    totalLeaves: string; cl: number; sl: number; pl: number; compoff: number; gender: string;
    showDialog = false; showDialog1 = false; showDialog2 = false; showDialog3 = false;
    date: DateModel; dateoptions: DatePickerOptions;
    private accessToken = localStorage.getItem("access_token");
    public userDetail;
    public imgBase64 = "data:image/png;base64,";
    apiBaseUrl = AppConfiguration.apiBaseUrl;
    private toasterService: ToasterService; private settings; selected: any; private leaveDetails; selectedData = []; public holidayDetails;
    public holidayDates: Date; public holidayEpoc: number;
    public imgURL: any;
    private searchFromDate; private searchToDate; paternityLeaveBalance: number; maternityLeaveBalance: number;
    constructor(private http: Http, private router: Router, public app: AppComponent, private auth: AuthGuard,
        private loginService: LoginService, private commonService: CommonService, toasterService: ToasterService) {
        this.dateoptions = new DatePickerOptions();
        this.toasterService = toasterService;
        //this.ToggleButton = true;
    }
    public toasterconfig: ToasterConfig =
        new ToasterConfig({
            showCloseButton: true,
            tapToDismiss: false,
            timeout: 0
        });
    public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd/mm/yyyy',
        showClearDateBtn: false,
        editableDateField: false,
        disableWeekends: true,
        enableDays: [
            { year: 2024, month: 4, day: 27 }
        ],
    };

    ngOnInit() {
        // this.ToggleButton = true;
        this.oldPassword = "";
        this.newPassword = "";
        this.reEnterPassword = "";
        if (this.loginService.checkCredentials()) {
            this.app.isLoggedIn = true;
        }
        let userId = localStorage.getItem("userId");
        let requrl = this.apiBaseUrl + '/ESS-Java/api/emplyee/dashboard/' + userId;
        let dashboardDetails = this.commonService.commonGetCall(requrl);
        dashboardDetails.subscribe((data) => {

            //      // getting porject details *****************************//
            //      if(userId != 'Admin' ){
            // let requrl2= this.apiBaseUrl+'/ESS-Java/api/hrms/getEmpProjectById/'+userId;
            // let employeeprojectname = this.commonService.commonGetCall(requrl2);  
            // employeeprojectname.subscribe((data) => {
            //         this.empprojectname=data._body;
            //         console.log("******---******",this.empprojectname);
            // });}
            this.userDetail = data.json();
            this.app.role = this.userDetail.empDet.role;
            this.empname = this.userDetail.empDet.employeeName;
            this.designation = this.userDetail.empDet.designation;
            this.app.empid = this.userDetail.empDet.empId;
            this.empid = this.userDetail.empDet.empId;
            this.mailid = this.userDetail.empDet.mailId;
            this.team = this.userDetail.empDet.projectName;
            this.mobileNo = this.userDetail.empDet.mobileNumber;
            this.bloodgroup = this.userDetail.empDet.bloodGroup;
            this.profileImage = this.userDetail.empDet.profileImage;
            if (this.profileImage == null) {
                this.imgURL = "assets/images/ext-profile.png";
            } else {
                this.imgURL = this.imgBase64 + this.profileImage;
            }
            if (this.userDetail.empAttenanceDet.timeIn) {
                let timestampforin = new Date(this.userDetail.empAttenanceDet.timeIn);
                this.timeIn = timestampforin.getHours() + ':' + timestampforin.getMinutes();
                this.dateIn = timestampforin;
            }
            else {
                this.timeIn = "";
                this.dateIn = "";
            }

            if (this.userDetail.empAttenanceDet.timeOut) {
                let timestampforout = new Date(this.userDetail.empAttenanceDet.timeOut);
                this.timeOut = timestampforout.getHours() + ':' + timestampforout.getMinutes();
                this.dateOut = timestampforout;
            }
            else {
                this.timeOut = "";
                this.dateOut = "";
            }
            this.authorise = this.userDetail.empAttenanceDet.authorised;
            this.cl = this.userDetail.empLeaveDet.clleaveBalance;
            this.sl = this.userDetail.empLeaveDet.slleaveBalance;
            this.pl = this.userDetail.empLeaveDet.plleaveBalance;
            this.compoff = this.userDetail.empLeaveDet.comOffBalance;
            // this.totalLeaves = this.userDetail.empLeaveDet.totalLeave;                                    
            let a: any = this.cl + this.sl + this.pl + this.compoff;
            this.totalLeaves = a;
            this.gender = this.userDetail.empDet.sex;
            this.maternityLeaveBalance = this.userDetail.empLeaveDet.maternityLeaveBalance;
            this.paternityLeaveBalance = this.userDetail.empLeaveDet.paternityLeaveBalance;
        },
            (error) => {
                this.auth.canActivate();
                let dashboardDetails1 = this.commonService.commonGetCall(requrl);
                dashboardDetails1.subscribe((data) => {
                    this.userDetail = data.json();
                    this.empname = this.userDetail.empDet.employeeName;
                    this.designation = this.userDetail.empDet.designation;
                    this.empid = this.userDetail.empDet.empId;
                    this.mailid = this.userDetail.empDet.mailId;
                    this.team = this.userDetail.empDet.projectName;
                    this.mobileNo = this.userDetail.empDet.mobileNumber;
                    this.bloodgroup = this.userDetail.empDet.bloodGroup;
                    this.profileImage = this.userDetail.empDet.profileImage;
                    if (this.profileImage == null) {
                        this.imgURL = "assets/images/ext-profile.png";
                    } else {
                        this.imgURL = this.imgBase64 + this.profileImage;
                    }
                    if (this.userDetail.empAttenanceDet.timeIn) {
                        let timestampforin = new Date(this.userDetail.empAttenanceDet.timeIn);
                        this.timeIn = timestampforin.getHours() + ':' + timestampforin.getMinutes();
                        this.dateIn = timestampforin;
                    }
                    else {
                        this.timeIn = "";
                        this.dateIn = "";
                    }
                    if (this.userDetail.empAttenanceDet.timeOut) {
                        let timestampforout = new Date(this.userDetail.empAttenanceDet.timeOut);
                        this.timeOut = timestampforout.getHours() + ':' + timestampforout.getMinutes();
                        this.dateOut = timestampforout;
                    }
                    else {
                        this.timeOut = "";
                        this.dateOut = "";
                    }
                    this.authorise = this.userDetail.empAttenanceDet.authorised;
                    this.cl = this.userDetail.empLeaveDet.clleaveBalance;
                    this.sl = this.userDetail.empLeaveDet.slleaveBalance;
                    this.pl = this.userDetail.empLeaveDet.plleaveBalance;
                    this.compoff = this.userDetail.empLeaveDet.comOffBalance;
                    this.totalLeaves = this.userDetail.empLeaveDet.totalLeave;
                    this.gender = this.userDetail.empDet.sex;
                    this.maternityLeaveBalance = this.userDetail.empLeaveDet.maternityLeaveBalance;
                    this.paternityLeaveBalance = this.userDetail.empLeaveDet.paternityLeaveBalance;
                },
                    (error) => {
                    });

            });

        this.app.isLoggedIn = true;

        this.settings = {
            selectMode: 'multi',
            mode: 'inline',

            hideSubHeader: true,
            actions: {
                add: false,
                edit: false,
                delete: false,
                //position: 'right'
            },
            pager: {
                display: true,
                perPage: 5
            },
            columns: {
                applieddate: {
                    title: 'Applied Date',
                    filter: false,
                    editable: false,
                    valuePrepareFunction: (cell: any, row: any) => {
                        let parsedDate = new Date(cell);
                        return parsedDate.getDate() + "/" + (parsedDate.getMonth() + 1) + "/" + parsedDate.getFullYear();
                    }
                },
                fromDate: {
                    title: 'From',
                    filter: false,
                    editable: false,
                    valuePrepareFunction: (cell: any, row: any) => {
                        let parsedDate = new Date(cell);

                        return parsedDate.getDate() + "/" + (parsedDate.getMonth() + 1) + "/" + parsedDate.getFullYear();
                    },
                },
                toDate: {
                    title: 'To',
                    filter: false,
                    editable: false,
                    valuePrepareFunction: (cell: any, row: any) => {
                        let parsedDate = new Date(cell);
                        return parsedDate.getDate() + "/" + (parsedDate.getMonth() + 1) + "/" + parsedDate.getFullYear();
                    }
                },
                noofDays: {
                    title: 'No Of Days',
                    filter: false
                },
                authorised: {
                    title: 'Authorised',
                    filter: false,
                    editable: false,
                    valuePrepareFunction: (cell: any, row: any) => {
                        if (cell == 'Y') {
                            return "Yes";
                        } else if (cell == 'N') {
                            return "No";
                        } else {
                            return "";
                        }
                    }
                }
            }
        };
        /* To get the leave details of an employee */
        let requrl1 = this.apiBaseUrl + '/ESS-Java/api/emplyee/getEmployeeLeaveDetails/';
        let appliedLeaveDetails = this.commonService.commonGetCall(requrl1);
        appliedLeaveDetails.subscribe((data) => {
            this.leaveDetails = data.json();

        },
            (error) => {
                this.auth.canActivate();
                appliedLeaveDetails = this.commonService.commonGetCall(requrl1);
                appliedLeaveDetails.subscribe((data) => {
                    this.leaveDetails = data.json();
                },
                    (error) => {
                    });

            });

        /* To get the holiday dates of an employee */
        let requrl2 = this.apiBaseUrl + '/ESS-Java/api/emplyee/getEmpHolidayDates/';
        let empHolidayDetails = this.commonService.commonGetCall(requrl2);
        empHolidayDetails.subscribe((data) => {
            this.holidayDetails = data.json();
        },
            (error) => {

                this.auth.canActivate();
                empHolidayDetails = this.commonService.commonGetCall(requrl2);
                empHolidayDetails.subscribe((data) => {
                    this.holidayDetails = data.json();
                },
                    (error) => {
                    });

            });




    }
    private applyLeaveFromDate;
    private applyLeaveToDate;
    private Type = '';
    private noofdays: any = '';
    private reason = '';

    saveLeaveApplication() {
        this.ToggleButton = true;
        this.TotalClPlSl = this.cl + this.sl + this.pl;
        this.Numberofdays = +this.noofdays;
        this.NoOfDaysControl = false;
        this.LeaveAlreadyAppliedControl = false;
        this.duplicateDaysControl = false;
        this.FreezeDaysControl = false;

        if (this.Type == 'CL/SL/PL') {
            if (this.Numberofdays > this.TotalClPlSl) {
                this.NoOfDaysControl = true;
            } else {
                this.NoOfDaysControl = false;
            }
        } else if (this.Type == 'CO') {
            if (this.Numberofdays > this.compoff) {
                this.NoOfDaysControl = true;
            } else {
                this.NoOfDaysControl = false;
            }
        } else if (this.Type == 'PTL') {
            if (this.Numberofdays > this.paternityLeaveBalance) {
                this.NoOfDaysControl = true;
            } else {
                this.NoOfDaysControl = false;
            }
        } else if (this.Type == 'MTL') {
            if (this.Numberofdays > this.maternityLeaveBalance) {
                this.NoOfDaysControl = true;
            } else {
                this.NoOfDaysControl = false;
            }
        }
        if (!(this.Numberofdays == this.checkNumberOfdays || this.Numberofdays == (this.checkNumberOfdays - 0.5))) {
            this.duplicateDaysControl = true;
        }
        else {
            this.duplicateDaysControl = false;
        }

        /*Freeze the date after 25 */
        // code added by saravanan

        if (this.freezeDateCheck > 1) {
            this.FreezeDaysControl = true;
        }
        else {
            this.FreezeDaysControl = false;
        }

        /* To check the existence applied leave of an employee */
        let applyfromDateFinal;
        let applytoDateFinal;

        if (this.applyLeaveFromDate) {
            let fromDateFormat = this.applyLeaveFromDate.date.year + "/" + this.applyLeaveFromDate.date.month + "/" + this.applyLeaveFromDate.date.day;
            applyfromDateFinal = new Date(fromDateFormat).getTime();
        }


        if (this.applyLeaveToDate) {
            let toDateFormat = this.applyLeaveToDate.date.year + "/" + this.applyLeaveToDate.date.month + "/" + this.applyLeaveToDate.date.day;
            applytoDateFinal = new Date(toDateFormat).getTime();
        }

        let searchData = {
            "fromDate": applyfromDateFinal,
            "toDate": applytoDateFinal
        }

        let userId = localStorage.getItem("userId");
        let searchData1 = {
            "empId": userId,
            "timeIn": applyfromDateFinal,
            "timeOut": applytoDateFinal
        }

        let currdate = new Date().getTime();
        let requrl2 = this.apiBaseUrl + '/ESS-Java/api/emplyee/isLeaveAlreadyApplied/';
        let alreadyAppliedDetails = this.commonService.commonPostCall(requrl2, searchData);
        alreadyAppliedDetails.subscribe((data) => {



            ///////////////////////////////////////////////////
            //////////////////////////////////////////////////
            // let requrl3 = this.apiBaseUrl + '/ESS-Java/api/emplyee/isLeaveOrOdAlreadyApplied/';
            //let LeaveOrOdAlreadyApplied = this.commonService.commonPostCall(requrl3,searchData);
            if (data._body == 'false') {
                // LeaveOrOdAlreadyApplied.subscribe((data1) => {
                //if (data1._body == 'false') {

                this.LeaveAlreadyAppliedControl = false;

                this.submitAttempt = true;
                if (this.Type != '' && this.noofdays != '' && this.reason != '' && !this.NoOfDaysControl && !this.duplicateDaysControl && !this.FreezeDaysControl) {

                    this.ToggleButton = true;
                    let newFromDate = this.applyLeaveFromDate.date.month + "/" + this.applyLeaveFromDate.date.day + "/" + this.applyLeaveFromDate.date.year;
                    let newToDate = this.applyLeaveToDate.date.month + "/" + this.applyLeaveToDate.date.day + "/" + this.applyLeaveToDate.date.year;
                    let applyLeaveData = {
                        "empIdIn": this.empid,
                        "fromDate": new Date(newFromDate).getTime(),
                        "toDate": new Date(newToDate).getTime(),
                        "leaveType": this.Type,
                        "noofDays": this.noofdays,
                        "reason": this.reason
                    }

                    /* apply leave for past days */
                    if ((currdate > applyfromDateFinal) && (currdate > applytoDateFinal)) {
                        let requrl4 = this.apiBaseUrl + '/ESS-Java/api/emplyee/getTimedetails/';
                        let alreadyAppliedDetails1 = this.commonService.commonPostCall(requrl4, searchData1);
                        alreadyAppliedDetails1.subscribe((data2) => {

                            if (data2._body != "") {
                                let checkname = data2.json();

                                let presentDate = {
                                    "empId": checkname.empId,
                                    "timeIn": checkname.timeIn,
                                    "timeOut": checkname.timeOut
                                }

                                let presentInTimeFormat = new Date(presentDate.timeIn);
                                let presentInTime = presentInTimeFormat.getTime();
                                let presentoutTimeFormat = new Date(presentDate.timeOut);
                                let presentOutTime = presentoutTimeFormat.getTime();
                                let diffrenceInPresentTime = presentOutTime - presentInTime;

                                /* NO intime/outtime OR Present worked hours less than half day can apply leave full(1) day*/
                                if ((diffrenceInPresentTime <= this.halfhour && diffrenceInPresentTime >= 0) || (diffrenceInPresentTime < 0)) {
                                    let requrl = this.apiBaseUrl + '/ESS-Java/api/emplyee/applyLeave/';
                                    let leaveResponseData = this.commonService.commonPostCall(requrl, applyLeaveData);
                                    leaveResponseData.subscribe((data) => {
                                        this.showDialog2 = false;
                                        this.ngOnInit();
                                        this.toasterService.pop('success', 'Leave Applied Successfully');
                                        this.ToggleButton = true;
                                    },
                                        (error) => {
                                            this.auth.canActivate();
                                            leaveResponseData = this.commonService.commonPostCall(requrl, applyLeaveData);
                                            leaveResponseData.subscribe((data) => {
                                                this.showDialog2 = false;
                                                this.ngOnInit();
                                                this.toasterService.pop('success', 'Leave Applied Successfully');
                                            },
                                                (error) => {
                                                });

                                        });
                                }

                                /* Present worked hours more than half day can only possible to apply 0.5 */
                                else if (diffrenceInPresentTime > this.halfhour && diffrenceInPresentTime <= this.fullhour) {
                                    if (applyLeaveData.noofDays == 0.5) {
                                        let requrl = this.apiBaseUrl + '/ESS-Java/api/emplyee/applyLeave/';
                                        let leaveResponseData = this.commonService.commonPostCall(requrl, applyLeaveData);
                                        leaveResponseData.subscribe((data) => {
                                            this.showDialog2 = false;
                                            this.ngOnInit();
                                            this.toasterService.pop('success', 'Leave Applied Successfully');
                                            this.ToggleButton = true;
                                        },
                                            (error) => {
                                                this.auth.canActivate();
                                                leaveResponseData = this.commonService.commonPostCall(requrl, applyLeaveData);
                                                leaveResponseData.subscribe((data) => {
                                                    this.showDialog2 = false;
                                                    this.ngOnInit();
                                                    this.toasterService.pop('success', 'Leave Applied Successfully');
                                                },
                                                    (error) => {
                                                    });

                                            });
                                    }
                                    else {
                                        this.toasterService.pop('error', ' Only Possible to apply 0.5 day ');
                                    }
                                } else {
                                    this.toasterService.pop('error', 'Leave cannot be applied for selected date');

                                }
                            } else {
                                let requrl = this.apiBaseUrl + '/ESS-Java/api/emplyee/applyLeave/';
                                let leaveResponseData = this.commonService.commonPostCall(requrl, applyLeaveData);
                                leaveResponseData.subscribe((data) => {
                                    this.showDialog2 = false;
                                    this.ngOnInit();
                                    this.toasterService.pop('success', 'Leave Applied Successfully');
                                    this.ToggleButton = true;
                                },
                                    (error) => {
                                        this.auth.canActivate();
                                        leaveResponseData = this.commonService.commonPostCall(requrl, applyLeaveData);
                                        leaveResponseData.subscribe((data) => {
                                            this.showDialog2 = false;
                                            this.ngOnInit();
                                            this.toasterService.pop('success', 'Leave Applied Successfully');
                                        },
                                            (error) => {
                                            });

                                    });
                            }
                        })
                    }

                    ///*Future date apply leave */
                    else {

                        let requrl = this.apiBaseUrl + '/ESS-Java/api/emplyee/applyLeave/';
                        let leaveResponseData = this.commonService.commonPostCall(requrl, applyLeaveData);
                        leaveResponseData.subscribe((data) => {
                            this.showDialog2 = false;
                            this.ngOnInit();
                            this.toasterService.pop('success', 'Leave Applied Successfully');
                            this.ToggleButton = true;
                        },
                            (error) => {
                                this.auth.canActivate();
                                leaveResponseData = this.commonService.commonPostCall(requrl, applyLeaveData);
                                leaveResponseData.subscribe((data) => {
                                    this.showDialog2 = false;
                                    this.ngOnInit();
                                    this.toasterService.pop('success', 'Leave Applied Successfully');
                                },
                                    (error) => {
                                    });

                            });

                    }

                    //     }
                    //     else{
                    //         this.toasterService.pop('error','Od already applied on this date');
                    //     }
                    // //});


                } else {
                    this.toasterService.pop('error', 'Try different date');
                }


            } else {
                this.LeaveAlreadyAppliedControl = true;
            }
        },

            (error) => {

                this.auth.canActivate();
                alreadyAppliedDetails = this.commonService.commonPostCall(requrl2, searchData);
                alreadyAppliedDetails.subscribe((data) => {

                    if (data._body == 'false') {
                        this.LeaveAlreadyAppliedControl = false;
                        this.submitAttempt = true;
                        if (this.Type != '' && this.noofdays != '' && this.reason != '' && !this.NoOfDaysControl) {

                            let newFromDate = this.applyLeaveFromDate.date.month + "/" + this.applyLeaveFromDate.date.day + "/" + this.applyLeaveFromDate.date.year;
                            let newToDate = this.applyLeaveToDate.date.month + "/" + this.applyLeaveToDate.date.day + "/" + this.applyLeaveToDate.date.year;
                            let applyLeaveData = {
                                "empIdIn": this.empid,
                                "fromDate": new Date(newFromDate).getTime(),
                                "toDate": new Date(newToDate).getTime(),
                                "leaveType": this.Type,
                                "noofDays": this.noofdays,
                                "reason": this.reason
                            }
                            let requrl = this.apiBaseUrl + '/ESS-Java/api/emplyee/applyLeave/';
                            let leaveResponseData = this.commonService.commonPostCall(requrl, applyLeaveData);
                            leaveResponseData.subscribe((data) => {
                                this.showDialog2 = false;
                                this.ngOnInit();
                                this.toasterService.pop('success', 'Leave Applied Successfully');
                            },
                                (error) => {

                                    this.auth.canActivate();
                                    leaveResponseData = this.commonService.commonPostCall(requrl, applyLeaveData);
                                    leaveResponseData.subscribe((data) => {
                                        this.showDialog2 = false;
                                        this.ngOnInit();
                                        this.toasterService.pop('success', 'Leave Applied Successfully');
                                    },
                                        (error) => {
                                        });

                                });
                        }
                    } else {
                        this.LeaveAlreadyAppliedControl = true;
                    }
                },
                    (error) => {

                    });

            });

    }
    onUserRowSelect(event) {
        this.selected = event.selected;
        if (this.selected.length) {
            this.ToggleButton = false;
        }
        else {
            this.ToggleButton = true;
        }
    }

    openLeaveApplication() {
        this.ToggleButton = false;
        this.clear();
        this.showDialog2 = true;
        this.Type = 'CL/SL/PL';
    }

    eventHandler(event: any) {
        const pattern = /^[0-9a-zA-Z\r\n@!#\$\^%&*()+_=\-\[\]\\\';,\.\/\{\}\|\":<>\?]+$/;;
        let inputChar = String.fromCharCode(event.charCode);

        if (!pattern.test(inputChar) && event.charCode != '0') {
            event.preventDefault();
        }
    }

    public oldPassword;
    public newPassword;
    private dataCheck;


    PasswordCheck() {
        this.submitAttempt = true;
        if (this.reEnterPassword != '' && this.newPassword != '' && this.oldPassword != '') {
            this.submitAttempt = false;
            if (this.oldPassword != this.newPassword) {
                if (this.reEnterPassword.length > 3 && this.newPassword > 3) {
                    if (this.reEnterPassword == this.newPassword) {

                        this.valid = false;
                        let passwordCheckData = {
                            "empId": this.empid,
                            "empPassword": this.oldPassword,
                            "newPassword": this.newPassword,
                        }

                        let requrl = this.apiBaseUrl + '/ESS-Java/api/emplyee/getUserDetails/';
                        let userCridentialsResponseData = this.commonService.commonPostCall(requrl, passwordCheckData);
                        userCridentialsResponseData.subscribe((data) => {
                            this.dataCheck = data._body;
                            this.dataCheck = data._body;
                            if (this.dataCheck == 'Success') {
                                this.toasterService.pop('success', 'Password Changed Successfully');
                                this.showDialog = !this.showDialog;
                                this.ngOnInit();
                                this.oldPassword = "";
                                this.newPassword = "";
                            }
                            else {
                                this.toasterService.pop('error', 'Incorrect Old Password');
                                this.showDialog = this.showDialog;
                            }

                        },
                            (error) => {
                                this.valid = false;
                                this.auth.canActivate();
                                userCridentialsResponseData = this.commonService.commonPostCall(requrl, passwordCheckData);
                                userCridentialsResponseData.subscribe((data) => {
                                    this.dataCheck = data._body;
                                    if (this.dataCheck == 'Success') {
                                        this.toasterService.pop('success', 'Password Changed Successfully');
                                        this.showDialog = !this.showDialog;
                                        this.ngOnInit();
                                    }
                                    else {
                                        this.toasterService.pop('error', 'Incorrect Old Password');
                                        this.showDialog = this.showDialog;
                                    }

                                },
                                    (error) => {
                                    });

                            });
                    }
                    else {
                        this.valid = true;
                    }
                }
                else {
                    this.toasterService.pop('error', 'Check the Password Length (Min:4,Max:8)');

                }
            } else {
                this.toasterService.pop('error', 'New Password Must Be Different from Old Password');

            }

        }
    }

    closePassword() {
        this.reEnterPassword = '';
        this.newPassword = '';
        this.oldPassword = '';
        this.submitAttempt = false;
        this.showDialog = !this.showDialog
    }
    cancelLeaveApplication() {
        this.ToggleButton = true;
        /* To cancel the applied leave by an employee */
        let requrl = this.apiBaseUrl + '/ESS-Java/api/emplyee/cancelLeave/';
        let leaveResponseData = this.commonService.commonPostCall(requrl, this.selected);
        leaveResponseData.subscribe((data) => {
            this.showDialog1 = false;
            this.ngOnInit();
            this.toasterService.pop('success', 'Leave Cancelled Successfully');
        },
            (error) => {
                this.auth.canActivate();
                leaveResponseData = this.commonService.commonPostCall(requrl, this.selected);
                leaveResponseData.subscribe((data) => {
                    this.showDialog1 = false;
                    this.ngOnInit();
                    this.toasterService.pop('success', 'Leave Cancelled Successfully');
                },
                    (error) => {
                    });

            });
    }
    /** Search Operation */
    searchEmpCancelLeaveDetails() {
        let fromDateFinal;
        let toDateFinal;

        if (this.searchFromDate) {
            let fromDateFormat = this.searchFromDate.date.year + "/" + this.searchFromDate.date.month + "/" + this.searchFromDate.date.day;
            fromDateFinal = new Date(fromDateFormat).getTime();
        }


        if (this.searchToDate) {
            let toDateFormat = this.searchToDate.date.year + "/" + this.searchToDate.date.month + "/" + this.searchToDate.date.day;
            toDateFinal = new Date(toDateFormat).getTime();
        }

        let searchData = {
            "fromDate": fromDateFinal,
            "toDate": toDateFinal,
        }
        let requrl = this.apiBaseUrl + '/ESS-Java/api/emplyee/leaveCancelSearch/';
        let empLeaveCancelSearch = this.commonService.commonPostCall(requrl, searchData);
        empLeaveCancelSearch.subscribe((data) => {
            this.leaveDetails = data.json();
        },

            (error) => {
                this.auth.canActivate();
                empLeaveCancelSearch = this.commonService.commonPostCall(requrl, searchData);
                empLeaveCancelSearch.subscribe((data) => {
                    this.leaveDetails = data.json();
                },
                    (error) => {

                    });

            });
    }

    /** Reset Operation */
    reset(): void {
        this.searchFromDate = ''; this.searchToDate = '';
        this.searchEmpCancelLeaveDetails();
    }

    openLeaveCancellation() {
        this.reset();
        this.ToggleButton = true;
        this.showDialog1 = true;

    }
    openChangePassword() {
        this.closePassword();
        this.showDialog = true;

    }
    onlyNumberKey(event) {
        return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
    }
    onlyDecimalNumberKey(event) {
        let charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 46 && charCode > 31
            && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }



    leavePolicy() {
        window.open("/assets/LeavePolicy/LeavePolicy.doc", '_self');
        return false;
    }


    reasonChange(event: any) {
        this.reslength = this.reason;
        if (this.reslength.length > 2) {
            this.ToggleButton = false;
        }
        else {
            this.ToggleButton = false;
        }
        // code added for 27 th for election
        if (this.saturdayCheck !== 0) {
            this.ToggleButton = true;
        }
        else {
            this.ToggleButton = false;
        }


    }

    //code added by saravanan

    dateFreeze() {

        let dayMillisecondsDF = 1000 * 60 * 60 * 24;
        this.freezeDateCheck = 0;

        while (this.startDateEpocDF <= this.endDateEpocDF) {
            // code added for 27 th for election
            if ((new Date(this.startDateEpocDF)).getDate() === 27 &&
                (new Date(this.startDateEpocDF)).getMonth() === 3 &&  // Note: January is 0, so July is 6
                (new Date(this.startDateEpocDF)).getFullYear() === 2024 && (this.noOfSundays !== 0)
            ) {
                this.saturdayCheck = 1;
                this.ToggleButton = true;
            }
            if ((this.noofdays) > 1) {
                this.freezeDate = (new Date(this.startDateEpocDF)).getDate();

                if (this.freezeDate == 26 || this.freezeDate == 25) {
                    this.freezeDateCheck += 1;
                }
            }
            this.startDateEpocDF = this.startDateEpocDF + dayMillisecondsDF;
        }


    }

    openLeaveDetails() {

        this.ToggleButton = true;
        this.showDialog5 = true;

        let userId = localStorage.getItem("userId");
        let requrl = this.apiBaseUrl + '/ESS-Java/api/emplyee/leaveUpdateDetails/' + userId;
        let leaveUpdateDetails = this.commonService.commonGetCall(requrl);
        leaveUpdateDetails.subscribe((data) => {
            this.leaveUpdateDetailsjson = data.json();
            this.pCL = this.leaveUpdateDetailsjson[0].previousCL;
            this.pSL = this.leaveUpdateDetailsjson[0].previousSL;
            this.pPL = this.leaveUpdateDetailsjson[0].previousPL;
            this.UpdatedCL = this.leaveUpdateDetailsjson[0].updatedCL;
            this.UpdatedSL = this.leaveUpdateDetailsjson[0].updatedSL;
            this.UpdatedPL = this.leaveUpdateDetailsjson[0].updatedPL;
            this.leaveupdatedate = this.leaveUpdateDetailsjson[0].createdDate;
            let parsedDate = new Date(this.leaveupdatedate);
            this.leavecurrentdate = parsedDate.getDate() + "/" + (parsedDate.getMonth() + 1) + "/" + parsedDate.getFullYear();
            this.totalpreviousleave = this.pCL + this.pSL + this.pPL;
            this.totalupdatedleave = this.UpdatedCL + this.UpdatedSL + this.UpdatedPL;

        },

            (error) => {
                this.auth.canActivate();
                leaveUpdateDetails = this.commonService.commonGetCall(requrl);
                leaveUpdateDetails.subscribe((data) => {
                    this.leaveUpdateDetailsjson = data.json();
                },
                    (error) => {

                    });

            });

    }



}


// WEBPACK FOOTER //
// D:/a/1/s/ess/ESS-Angular/src/app/dashboard/dashboard.component.ts