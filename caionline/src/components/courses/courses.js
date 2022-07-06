import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { PIC_BASEURL } from '../../helpers/picUrl';

import * as serviceKit from '../../services';
import { useQuery } from 'react-query';

function Courses() {
  let emptyCourses = {
    id: null,
    name: '',
    teacher: '',
    description: '',
    Status: 'OPEN',
    state: 'new'
  };

  const [Courses, setCourses] = useState(null);
  const [CourseCUDs, setCourseCUDs] = useState([]);
  const [CourseDialog, setCourseDialog] = useState(false);
  const [deleteCourseDialog, setDeleteCourseDialog] = useState(false);
  const [deleteCoursesDialog, setDeleteCoursesDialog] = useState(false);
  const [Course, setCourse] = useState(emptyCourses);
  const [selectedCourses, setSelectedCourses] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const [deletedCourses, setDeletedCourses] = useState([]);
  const [refresh, SetRefresh] = useState(false);
  useEffect(() => {
    serviceKit.courseServices.getAll().then(rtn => {
      let newCourses = [];
      newCourses = rtn.data.map(r => {
        let np = { ...r };
        np.state = '';
        return np;
      });
      setCourses(newCourses);
    });
  }, [refresh]);

  const openNew = () => {
    setCourse(emptyCourses);
    setSubmitted(false);
    setCourseDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setCourseDialog(false);
  };

  const hideDeleteCourseDialog = () => {
    setDeleteCourseDialog(false);
  };

  const hideDeleteCoursesDialog = () => {
    setDeleteCoursesDialog(false);
  };

  const saveCourse = () => {
    setSubmitted(true);

    if (Course.name.trim()) {
      console.log(Courses);
      let _Courses = [...Courses];
      let _Course = { ...Course };
      if (Course.id) {
        const index = findIndexById(Course.id);

        _Courses[index] = _Course;
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Course Updated',
          life: 3000
        });
      } else {
        _Course.id = createId();
        _Course.image = 'product-placeholder.svg';
        _Courses.push(_Course);
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Course Created',
          life: 3000
        });
      }

      setCourses(_Courses);
      setCourseDialog(false);
      setCourse(emptyCourses);
    }
  };

  const editCourse = (Course) => {
    Course.state = 'modified';
    setCourse({ ...Course });
    setCourseDialog(true);
  };

  const confirmDeleteCourse = (Course) => {
    Course.state = 'deleted';
    let _deletedCourses = [...deletedCourses];
    _deletedCourses.push(Course);
    setDeletedCourses(_deletedCourses);
    setCourse(Course);
    setDeleteCourseDialog(true);
  };

  const deleteCourse = () => {
    let _Sources = Courses.filter(val => val.id !== Course.id);
    setCourses(_Sources);
    setDeleteCourseDialog(false);
    setCourse(emptyCourses);
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Course Deleted',
      life: 3000
    });
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < Courses.length; i++) {
      if (Courses[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  };

  const createId = () => {
    let id = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteCoursesDialog(true);
  };

  const deleteSelectedCourses = () => {
    let _Sources = Courses.filter(val => !selectedCourses.includes(val));
    let _deletedCourses = Courses.filter(val => selectedCourses.includes(val));
    _deletedCourses = _deletedCourses.map(p => { return { ...p, state: 'deleted' }; });
    let _deletedCourse = [...deletedCourses];
    _deletedCourse.push(..._deletedCourses);
    setDeletedCourses(_deletedCourse);
    setCourses(_Sources);
    setDeleteCoursesDialog(false);
    setSelectedCourses(null);
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Products Deleted',
      life: 3000
    });
  };

  const onCategoryChange = (e) => {
    console.log(e.value);
    let _Source = { ...Course };
    _Source['Status'] = e.value;
    setCourse(_Source);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _Course = { ...Course };
    _Course[`${name}`] = val;
    setCourse(_Course);
  };

  const statusBodyTemplate = (rowData) => {
    return <span
      className={`Source status-${rowData.Status.toLowerCase()}`}>{rowData.Status}</span>;
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2"
                onClick={() => editCourse(rowData)}/>
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger"
                onClick={() => confirmDeleteCourse(rowData)}/>
      </React.Fragment>
    );
  };
  const saveToDb = () => {
    let prds = Courses.filter(p => p.state !== '');
    prds = prds.concat(deletedCourses);
    serviceKit.courseServices.update(prds).then(rtn => {
      SetRefresh(!refresh);
      setDeletedCourses([]);
    });
  };

  const header = (
    <div className="flex flex-column md:flex-row md:align-items-center justify-content-between">
            <span className="p-input-icon-left w-full md:w-auto">
                <i className="pi pi-search"/>
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)}
                           placeholder="Search..." className="w-full lg:w-auto"/>
            </span>
      <div className="mt-3 md:mt-0 flex justify-content-end">
        <Button icon="pi pi-plus" className="mr-2 p-button-rounded" onClick={openNew} tooltip="New"
                tooltipOptions={{ position: 'bottom' }}/>
        <Button icon="pi pi-trash" className="p-button-danger mr-2 p-button-rounded"
                onClick={confirmDeleteSelected}
                disabled={!selectedCourses || !selectedCourses.length} tooltip="Delete"
                tooltipOptions={{ position: 'bottom' }}/>
        <Button icon="pi pi-upload" className="p-button-help p-button-rounded mr-2"
                onClick={exportCSV} tooltip="Export" tooltipOptions={{ position: 'bottom' }}/>
        <Button icon="pi pi-save" className=" p-button-rounded" onClick={() => { saveToDb(); }}
                tooltip="Save" tooltipOptions={{ position: 'bottom' }}/>
      </div>
    </div>
  );
  const CourseDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog}/>
      <Button label="Save" icon="pi pi-check" onClick={saveCourse}/>
    </React.Fragment>
  );

  const deleteCourseDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" className="p-button-text"
              onClick={hideDeleteCourseDialog}/>
      <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteCourse}/>
    </React.Fragment>
  );

  const deleteCoursesDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" className="p-button-text"
              onClick={hideDeleteCoursesDialog}/>
      <Button label="Yes" icon="pi pi-check" className="p-button-text"
              onClick={deleteSelectedCourses}/>
    </React.Fragment>
  );

  return (
    <div className="datatable-crud-demo surface-card p-4 border-round shadow-2">
      <Toast ref={toast}/>

      <div className="text-3xl text-800 font-bold mb-4">课程管理</div>

      <DataTable ref={dt} value={Courses} selection={selectedCourses}
                 onSelectionChange={(e) => setSelectedCourses(e.value)}
                 dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                 paginatorTemplate="首页 PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                 currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                 globalFilter={globalFilter} header={header} responsiveLayout="scroll">
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}
                exportable={false}></Column>
        <Column field="name" header="Name" sortable style={{ minWidth: '16rem' }}></Column>
        <Column field="description" header="Description" sortable style={{ minWidth: '16rem' }}></Column>
        <Column field="teacher" header="Teacher" sortable style={{ minWidth: '12rem' }}></Column>
        <Column field="Status" header="Status" body={statusBodyTemplate} sortable
                style={{ minWidth: '12rem' }}></Column>
        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
      </DataTable>

      <Dialog visible={CourseDialog} breakpoints={{ '960px': '75vw', '640px': '100vw' }}
              style={{ width: '40vw' }} header="Source Details" modal className="p-fluid"
              footer={CourseDialogFooter} onHide={hideDialog}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <InputText id="name" value={Course.name} onChange={(e) => onInputChange(e, 'name')}
                     required autoFocus
                     className={classNames({ 'p-invalid': submitted && !Course.name })}/>
          {submitted && !Course.name && <small className="p-error">Name is required.</small>}
        </div>
        <div className="field">
          <label htmlFor="description">Description</label>
          <InputTextarea id="description" value={Course.description}
                         onChange={(e) => onInputChange(e, 'description')} required rows={3}
                         cols={20}/>
        </div>
        <div className="field">
          <label htmlFor="teacher">Teacher</label>
          <InputTextarea id="teacher" value={Course.teacher}
                         onChange={(e) => onInputChange(e, 'teacher')} required rows={3}
                         cols={20}/>
        </div>

        <div className="field">
          <label className="mb-3">Category</label>
          <div className="formgrid grid">
            <div className="field-radiobutton col-6">
              <RadioButton inputId="category1" name="category" value="OPEN"
                           onChange={onCategoryChange}
                           checked={Course.Status === '开启'}/>
              <label htmlFor="category1">开启</label>
            </div>
            <div className="field-radiobutton col-6">
              <RadioButton inputId="category2" name="category" value="CLOSE"
                           onChange={onCategoryChange} checked={Course.Status === '关闭'}/>
              <label htmlFor="category2">关闭</label>
            </div>
          </div>
        </div>


      </Dialog>

      <Dialog visible={deleteCourseDialog} style={{ width: '450px' }} header="Confirm" modal
              footer={deleteCourseDialogFooter} onHide={hideDeleteCourseDialog}>
        <div className="flex align-items-center justify-content-center">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }}/>
          {Course && <span>Are you sure you want to delete <b>{Course.name}</b>?</span>}
        </div>
      </Dialog>

      <Dialog visible={deleteCoursesDialog} style={{ width: '450px' }} header="Confirm" modal
              footer={deleteCoursesDialogFooter} onHide={hideDeleteCoursesDialog}>
        <div className="flex align-items-center justify-content-center">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }}/>
          {Course && <span>Are you sure you want to delete the selected courses?</span>}
        </div>
      </Dialog>
    </div>
  );
}

export default Courses;
