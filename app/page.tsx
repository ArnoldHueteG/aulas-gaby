'use client'
import {
  Week, ScheduleComponent, EventSettingsModel, Inject, ViewsDirective, ViewDirective, PopupOpenEventArgs
} from '@syncfusion/ej2-react-schedule';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { Internationalization } from '@syncfusion/ej2-base';
import { registerLicense } from '@syncfusion/ej2-base';
import React, { useEffect, useState } from 'react';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NCaF5cXmZCeEx1RXxbf1x0ZF1MY1pbQXdPIiBoS35RckVlW3xccHdTQ2FdUENx');

const onChange = (e: any, setSelectedAula: (aula: string) => void, getData: (aula: string) => Promise<void>) => {
  const selectedAula = e.value;
  setSelectedAula(selectedAula);
  getData(selectedAula);
}

const fetchCalendarData = async (aula: string) => {
  const response = await fetch(`/calendar?aula=${aula}`);
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
  const aulas = data.map((item: any, index: number) => item.id_instalaciones);
  return aulas;
}

export default function Home() {
  const [timelineResourceData, setTimelineResourceData] = useState<Object[]>([]);
  const [aulasData, setAulasData] = useState<string[]>([]);
  const [selectedAula, setSelectedAula] = useState<string>('');

  const getData = async (aula: string) => {
    const data = await fetchCalendarData(aula);
    setTimelineResourceData(data);
  };

  useEffect(() => {
    const getAulasData = async () => {
      const data = await fetchAulasData();
      setAulasData(data);
      if (data.length > 0) {
        const initialAula = data[0];
        setSelectedAula(initialAula);
        getData(initialAula);
      }
    };
    getAulasData();
  }, []);

  const eventSettings: EventSettingsModel = { dataSource: timelineResourceData };
  return (
    <>
      <h2>Programación por Aulas</h2>
      <div className="w-12" style={{ width: '12rem' }}>
        <ComboBoxComponent
          id="comboelement"
          dataSource={aulasData}
          value={selectedAula}
          allowFiltering={true}
          change={(e) => onChange(e, setSelectedAula, getData)}
        />
      </div>
      <ScheduleComponent
        width='auto'
        height='auto'
        currentView='Week'
        readonly={true}
        cssClass='schedule-cell-dimension'
        selectedDate={new Date(2024, 7, 26)}
        firstDayOfWeek={1}
        eventSettings={eventSettings}>
        <ViewsDirective>
          <ViewDirective option='Week' startHour='07:00' endHour='24:00' />
        </ViewsDirective>
        <Inject services={[Week]} />
      </ScheduleComponent>
    </>
  )
}