import * as data from './shared/data.json';

function CostOfChips(chip, quantity) {
  return chip.price * quantity;
}

function Calculator(values) {
  const processor = data.processors.find(p => p.id === values.processor);
  const ramChip = data.ramChips.find(r => r.id === values.ram);
  const graphicsCard = data.graphicsCards.find(gc => gc.id === values.graphicsCard);

  let total = processor.price +
    CostOfChips(ramChip, values.numOfRAMSticks) +
    CostOfChips(graphicsCard, values.numOfGrfxCards);

  return total;
};

export default Calculator;