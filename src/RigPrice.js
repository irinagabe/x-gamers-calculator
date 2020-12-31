import Calculator from './Calculator';

const RigPrice = (props) => {
  let formValues = props.values;
  let totalCost;

  if (formValues) {
    totalCost = Calculator(formValues);
    return (
      <div className="mt-2 text-center text-blue-600 text-6xl font-bold">
        {`KES ${totalCost}`}
      </div>
    );
  } else {
    return null;
  }
};

export default RigPrice;