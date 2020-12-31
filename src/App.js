import React, { useState } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

import RigPrice from './RigPrice';
import * as data from './shared/data.json';

const Select = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="w-full mb-4 md:mb-0">
      <label htmlFor={props.id || props.name} className="tracking-wide text-blue-400 text-md font-semibold mb-2">{label}</label>
      <select {...field} {...props} className="w-full font-medium text-blue-700 border border-gray-200 rounded-md p-2 mb-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
      {meta.touched && meta.error ? (
        <div className="text-sm font-medium text-purple-500 pl-2">{meta.error}</div>
      ) : null}
    </div>
  );
};

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="w-auto mb-6 md:mb-0">
        <label htmlFor={props.id || props.name} className="tracking-wide text-blue-400 text-md font-semibold mb-2">{label}</label>
        <input  {...field} {...props} className="w-full font-medium text-blue-700 border border-gray-200 rounded-md p-2 mb-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
        {meta.touched && meta.error ? (
          <div className="text-sm font-medium text-purple-500 pl-2">{meta.error}</div>
        ) : null}
      </div>
    </>
  );
};

const ComponentsForm = () => {
  const [formValues, setFormValues] = useState({});

  return (
    <>
      <div className="flex items-center text-3xl text-blue-400 font-extrabold mb-4 ">
        <h1>Build A Rig</h1>
      </div>
      <div className="flex flex-col">
        <Formik
          initialValues={{
            processor: '',
            ram: '',
            numOfRAMSticks: '',
            graphicsCard: '',
            numOfGrfxCards: '',
          }}
          validationSchema={Yup.object({
            processor: Yup.string()
              .oneOf(
                data.processors.map((processor, i) =>
                  `${processor.id}`
                ),
                'Unavailable processor chosen')
              .required('Choose a processor'),
            ram: Yup.string()
              .oneOf(
                data.ramChips.map((chip, i) =>
                  `${chip.id}`
                ),
                'Unavailable RAM chip chosen')
              .required('Choose a RAM chip'),
            numOfRAMSticks: Yup.string()
              .max(1, '1 to 9 only!')
              .required('Required'),
            graphicsCard: Yup.string()
              .oneOf(
                data.graphicsCards.map((card, i) =>
                  `${card.id}`
                ),
                'Unavailable graphics card chosen')
              .required('Choose a graphics card'),
            numOfGrfxCards: Yup.string()
              .max(2, 'Must be 2 cards or less')
              .required('Required'),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setFormValues(values);
            await new Promise((r) => setTimeout(r, 400));
            setSubmitting(false);
          }}
        >
          <Form>
            <Select label="Processor" name="processor">
              <option value="">Select a processor</option>
              {data.processors.map((processor, id) =>
                <option value={processor.id} key={id}>{processor.model}</option>
              )}
            </Select>
            <div className="flex flex-row gap-2">
              <Select label="RAM" name="ram" >
                <option value="">Select a RAM chip</option>
                {data.ramChips.map((chip, id) =>
                  <option value={chip.id} key={id}>
                    {chip.size} GB {chip.class} {chip.speed ? `- ${chip.speed} GHz` : null}
                  </option>
                )}
              </Select>
              <Input
                label="Sticks"
                name="numOfRAMSticks"
                type="number"
                placeholder="1,2..."

              />
            </div>
            <div className="flex flex-row gap-2">
              <Select label="Graphics Card" name="graphicsCard" >
                <option value="">Select a graphics card</option>
                {data.graphicsCards.map((card, id) =>
                  <option value={card.id} key={id}>{card.model} {card.vram} GB</option>
                )}
              </Select>
              <Input
                label="Cards"
                name="numOfGrfxCards"
                type="number"
                placeholder="1,2..."

              />
            </div>
            <div className="w-full flex flex-row gap-2">
              <button type="reset" className="w-1/2 bg-blue-200 hover:bg-blue-300 text-blue-500 hover:text-white font-medium text-lg py-2 rounded">Clear Form</button>
              <button type="submit" className="w-1/2 bg-blue-700 hover:bg-blue-500 text-white font-medium text-lg py-2 rounded">Calculate Total</button>
            </div>
          </Form>
        </Formik>
      </div>
      {formValues.processor && <RigPrice values={formValues} />}
    </>
  );
}

function App() {
  return (
    <div>
      <ComponentsForm />
    </div>
  );
}

export default App;