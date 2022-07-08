
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

function Classes() {
  let emptyClasses = {
    id: null,
    name: '',
    teacher: '',
    description: '',
    state: 'new'
  };

  const [Classes, setClasses] = useState(null);
  const [classesCUDs, setclassesCUDs] = useState([]);
  const [classesDialog, setclassesDialog] = useState(false);
  const [deleteclassesDialog, setDeleteclassesDialog] = useState(false);
  const [deleteClassesDialog, setDeleteClassesDialog] = useState(false);
  const [classes, setclasses] = useState(emptyClasses);
  const [selectedClasses, setSelectedClasses] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const [deletedClasses, setDeletedClasses] = useState([]);
  const [refresh, SetRefresh] = useState(false);

  useEffect(() => {
    serviceKit.classServices.getAll().then(rtn => {
      let newClasses = [];
      newClasses = rtn.data.map(r => {
        let np = { ...r };
        np.state = '';
        return np;
      });
      setClasses(newClasses);
    });
  }, [refresh]);

  const openNew = () => {
    setclasses(emptyClasses);
    setSubmitted(false);
    setclassesDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setclassesDialog(false);
  };

  const hideDeleteclassesDialog = () => {
    setDeleteclassesDialog(false);
  };

  const hideDeleteClassesDialog = () => {
    setDeleteClassesDialog(false);
  };

  const saveclasses = () => {
    setSubmitted(true);

    if (classes.name.trim()) {
      console.log(classes);
      let _Classes = [...Classes];
      let _classes = { ...classes };
      if (classes.id) {
        const index = findIndexById(classes.id);

        _Classes[index] = _classes;
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Classes Updated',
          life: 3000
        });
      } else {
        _classes.id = createId();
        _classes.image = 'product-placeholder.svg';
        _Classes.push(_classes);
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Classes Created',
          life: 3000
        });
      }

      setClasses(_Classes);
      setclassesDialog(false);
      setclasses(emptyClasses);
    }
  };

  const editclasses = (classes) => {
    classes.state = 'modified';
    setclasses({ ...classes });
    setclassesDialog(true);
  };

  const confirmDeleteclasses = (classes) => {
    classes.state = 'deleted';
    let _deletedClasses = [...deletedClasses];
    _deletedClasses.push(classes);
    setDeletedClasses(_deletedClasses);
    setclasses(classes);
    setDeleteclassesDialog(true);
  };

  const deleteclasses = () => {
    let _Classes = Classes.filter(val => val.id !== classes.id);
    setClasses(_Classes);
    setDeleteclassesDialog(false);
    setclasses(emptyClasses);
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Classes Deleted',
      life: 3000
    });
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < Classes.length; i++) {
      if (Classes[i].id === id) {
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
    setDeleteClassesDialog(true);
  };

  const deleteSelectedClasses = () => {
    let _Classes = Classes.filter(val => !selectedClasses.includes(val));
    let _deletedClasses = Classes.filter(val => selectedClasses.includes(val));
    _deletedClasses = _deletedClasses.map(p => { return { ...p, state: 'deleted' }; });
    let _deletedclasses = [...deletedClasses];
    _deletedclasses.push(..._deletedClasses);
    setDeletedClasses(_deletedclasses);
    setClasses(_Classes);
    setDeleteClassesDialog(false);
    setSelectedClasses(null);
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Products Deleted',
      life: 3000
    });
  };

  const onCategoryChange = (e) => {
    console.log(e.value);
    let _classes = { ...classes };
    _classes['Status'] = e.value;
    setclasses(_classes);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _Course = { ...classes };
    _Course[`${name}`] = val;
    setclasses(_Course);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2"
                onClick={() => editclasses(rowData)}/>
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger"
                onClick={() => confirmDeleteclasses(rowData)}/>
      </React.Fragment>
    );
  };

  const saveToDb = () => {
    let prds = Classes.filter(p => p.state !== '');
    prds = prds.concat(deletedClasses);
    serviceKit.classServices.update(prds).then(rtn => {
      SetRefresh(!refresh);
      setDeletedClasses([]);
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
                disabled={!selectedClasses || !selectedClasses.length} tooltip="Delete"
                tooltipOptions={{ position: 'bottom' }}/>
        <Button icon="pi pi-upload" className="p-button-help p-button-rounded mr-2"
                onClick={exportCSV} tooltip="Export" tooltipOptions={{ position: 'bottom' }}/>
        <Button icon="pi pi-save" className=" p-button-rounded" onClick={() => { saveToDb(); }}
                tooltip="Save" tooltipOptions={{ position: 'bottom' }}/>
      </div>
    </div>
  );

  const classesDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog}/>
      <Button label="Save" icon="pi pi-check" onClick={saveclasses}/>
    </React.Fragment>
  );

  const deleteclassesDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" className="p-button-text"
              onClick={hideDeleteclassesDialog}/>
      <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteclasses}/>
    </React.Fragment>
  );

  const deleteClassesDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" className="p-button-text"
              onClick={hideDeleteClassesDialog}/>
      <Button label="Yes" icon="pi pi-check" className="p-button-text"
              onClick={deleteSelectedClasses}/>
    </React.Fragment>
  );

  return (
    <div className="datatable-crud-demo surface-card p-4 border-round shadow-2">
      <Toast ref={toast}/>

      <div className="text-3xl text-800 font-bold mb-4">班级管理</div>

      <DataTable ref={dt} value={Classes} selection={selectedClasses}
                 onSelectionChange={(e) => setSelectedClasses(e.value)}
                 dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                 paginatorTemplate="首页 PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                 currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                 globalFilter={globalFilter} header={header} responsiveLayout="scroll">
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}
                exportable={false}></Column>
        <Column field="name" header="Name" sortable style={{ minWidth: '16rem' }}></Column>
        <Column field="description" header="Description" sortable style={{ minWidth: '16rem' }}></Column>
        <Column field="teacher" header="Teacher" sortable style={{ minWidth: '12rem' }}></Column>
        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
      </DataTable>

      <Dialog visible={classesDialog} breakpoints={{ '960px': '75vw', '640px': '100vw' }}
              style={{ width: '40vw' }} header="Source Details" modal className="p-fluid"
              footer={classesDialogFooter} onHide={hideDialog}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <InputText id="name" value={classes.name} onChange={(e) => onInputChange(e, 'name')}
                     required autoFocus
                     className={classNames({ 'p-invalid': submitted && !classes.name })}/>
          {submitted && !classes.name && <small className="p-error">Name is required.</small>}
        </div>
        <div className="field">
          <label htmlFor="description">Description</label>
          <InputTextarea id="description" value={classes.description}
                         onChange={(e) => onInputChange(e, 'description')} required rows={3}
                         cols={20}/>
        </div>
        <div className="field">
          <label htmlFor="teacher">Teacher</label>
          <InputTextarea id="teacher" value={classes.teacher}
                         onChange={(e) => onInputChange(e, 'teacher')} required rows={3}
                         cols={20}/>
        </div>
      </Dialog>

      <Dialog visible={deleteclassesDialog} style={{ width: '450px' }} header="Confirm" modal
              footer={deleteclassesDialogFooter} onHide={hideDeleteclassesDialog}>
        <div className="flex align-items-center justify-content-center">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }}/>
          {classes && <span>Are you sure you want to delete <b>{classes.name}</b>?</span>}
        </div>
      </Dialog>

      <Dialog visible={deleteClassesDialog} style={{ width: '450px' }} header="Confirm" modal
              footer={deleteClassesDialogFooter} onHide={hideDeleteClassesDialog}>
        <div className="flex align-items-center justify-content-center">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }}/>
          {classes && <span>Are you sure you want to delete the selected classes?</span>}
        </div>
      </Dialog>
    </div>
  );
}


export default Classes;
