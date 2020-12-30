import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

const Select = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div>{meta.error}</div>
      ) : null}
    </div>
  );
};

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input  {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

function CostOfChips(chip, quantity) {
  return chip.price * quantity;
}

class ComponentsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {}
    }
  }

  Calculator(values) {
    const processor = processors.find(p => p.id === values.processor);
    const ram = ramChips.find(r => r.id === values.ram);
    const graphicsCard = graphicsCards.find(gc => gc.id === values.graphicsCard);
    let total = processor.price +
      CostOfChips(ram, values.numOfRAMSticks) +
      CostOfChips(graphicsCard, values.numOfGrfxCards);

    return total;
  };

  render() {
    return (
      <>
        <h1>Build A Rig</h1>
        <Formik
          initialValues={{
            processor: '',
            ram: '',
            numOfRAMSticks: 0,
            graphicsCard: '',
            numOfGrfxCards: 0,
          }}
          validationSchema={Yup.object({
            processor: Yup.string()
              .oneOf(
                processors.map((processor, i) =>
                  `${processor.id}`
                ),
                'Unavailable processor chosen')
              .required('Choose a processor'),
            ram: Yup.string()
              .oneOf(
                ramChips.map((chip, i) =>
                  `${chip.id}`
                ),
                'Unavailable RAM chip chosen')
              .required('Choose a RAM chip'),
            numOfRAMSticks: Yup.string()
              .max(8, 'Must be 8 chips or less')
              .required('Required'),
            graphicsCard: Yup.string()
              .oneOf(
                graphicsCards.map((card, i) =>
                  `${card.id}`
                ),
                'Unavailable graphics card chosen')
              .required('Choose a graphics card'),
            numOfGrfxCards: Yup.string()
              .max(2, 'Must be 2 cards or less')
              .required('Required'),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            await new Promise((r) => setTimeout(r, 400));
            console.log(this.Calculator(values));
            console.log(JSON.stringify(values, null, 4));
            setSubmitting(false);
            resetForm({ values: '' });
          }}
        >
          <Form>
            <Select label="Processor" name="processor">
              <option value="">Select a processor</option>
              {processors.map((processor, id) =>
                <option value={processor.id} key={id}>{processor.model}</option>
              )}
            </Select>
            <Select label="RAM" name="ram">
              <option value="">Select a RAM chip</option>
              {ramChips.map((chip, id) =>
                <option value={chip.id} key={id}>{chip.size} GB</option>
              )}
            </Select>
            <Input
              label="No. of RAM Sticks"
              name="numOfRAMSticks"
              type="number"
              placeholder="1"
            />
            <Select label="Graphics Card" name="graphicsCard">
              <option value="">Select a graphics card</option>
              {graphicsCards.map((card, id) =>
                <option value={card.id} key={id}>{card.model} {card.vram} GB</option>
              )}
            </Select>
            <Input
              label="No. of Graphics Cards"
              name="numOfGrfxCards"
              type="number"
              placeholder="1"
            />
            <br />
            <button type="submit">Submit</button>
            <button type="reset">Clear</button>
          </Form>
        </Formik>
      </>
    );
  }
}

function App() {
  return (
    <ComponentsForm />
  );
}

export default App;

const processors = [
  { id: '1', model: 'Intel Hexa Corei5 9400F (9th Gen)', clock_speed: 4.1, price: 21950 },
  { id: '2', model: 'AMD Ryzen 5 3600', clock_speed: 4.3, price: 28950 },
  { id: '3', model: 'Intel Corei7 10700KF (10th Gen)', clock_speed: 5.1, price: 49950 },
];

const ramChips = [
  { id: '1', size: 8, class: 'DDR3', price: 5950 },
  { id: '2', size: 8, class: 'DDR4', price: 5950 },
  { id: '3', size: 16, class: 'DDR4', speed: 2.6, price: 10950 },
  { id: '4', size: 16, class: 'DDR4', speed: 3.2, price: 14500 },
  { id: '5', size: 32, class: 'DDR4', speed: 2.6, price: 19950 },
];

const graphicsCards = [
  { id: '1', model: 'NVIDIA GT 710', vram: 2, price: 6450 },
  { id: '2', model: 'NVIDIA GeForce GT 730', vram: 4, price: 12950 },
  { id: '3', model: 'AMD Radeon R7 240', vram: 4, price: 13950 },
  { id: '4', model: 'NVIDIA GTX 1050Ti', vram: 4, price: 22950 },
];