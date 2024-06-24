'use client'
import {
  Week, ScheduleComponent, EventSettingsModel, Inject,ViewsDirective, ViewDirective, PopupOpenEventArgs
} from '@syncfusion/ej2-react-schedule';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { Internationalization } from '@syncfusion/ej2-base';
import { registerLicense } from '@syncfusion/ej2-base';
import React, { useEffect, useState } from 'react';
// import { timelineResourceData } from './datasource';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NCaF5cXmZCeEx1RXxbf1x0ZF1MY1pbQXdPIiBoS35RckVlW3xccHdTQ2FdUENx');

const fetchCalendarData = async () => {
  const response = await fetch('/calendar');
  const data = await response.json();
  return data.map((item: any, index: number) => ({
    Id: index + 1,
    Subject: item.curso,
    StartTime: new Date(item.fecha_ini),
    EndTime: new Date(item.fecha_fin),
    RecurrenceRule: 'FREQ=WEEKLY;INTERVAL=1',
  }));
}

const fetchAulasData = async () => {
  const response = await fetch('/aulas');
  const data = await response.json();
  // parse the dict to just values id_instalaciones
  const aulas = data.map((item: any, index: number) => item.id_instalaciones);
  return aulas;
}
export default function Home() {

  const [timelineResourceData, setTimelineResourceData] = useState<Object[]>([]);
  const [aulasData, setAulasData] = useState<string[]>([]);
  useEffect(() => {
    const getAulasData = async () => {
      const data = await fetchAulasData();
      setAulasData(data);
    };
    getAulasData();
  },
  []);
  useEffect(() => {
    const getData = async () => {
      const data = await fetchCalendarData();
      setTimelineResourceData(data);
    };
    getData();
  }, []);

  const eventSettings: EventSettingsModel = { dataSource: timelineResourceData }
  return (
    <>
      <h2>Programación por Aulas</h2>
      <div className="w-12" style={{ width: '12rem' }}>
        <ComboBoxComponent id="comboelement" 
          dataSource={aulasData}
        />
      </div>
      <ScheduleComponent 
        width='auto' 
        height='auto' 
        currentView='Week' 
        readonly={true}
        // popupOpen={onPopupOpen}
        cssClass='schedule-cell-dimension'
        selectedDate={new Date(2024, 7, 26)} 
        firstDayOfWeek={1}
        eventSettings={eventSettings} >
        <ViewsDirective>
          <ViewDirective option='Week' startHour='07:00' endHour='24:00' />
        </ViewsDirective>
        <Inject services={[Week]} />
      </ScheduleComponent>
    </>
  )
}