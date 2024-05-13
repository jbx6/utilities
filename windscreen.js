var rate = 15;

const prerequisites = {
  glass: {
    windscreen: 276.68,
    delivery: 30
  },
  tools: {
    suctionCups: 20,
    cleaningSolution: 15,
    adhesive: 20
  },
  labour: {
    hours: 6,
    rate: rate
  }
}

function calculateCost(isLabourFree: boolean) {
  try {
    const { glass, tools, labour } = prerequisites;
      if (!glass || !tools || !labour) {
      throw new Error(`Prerequisites not met: ${!glass ? "glass" : ""} ${!tools ? "tools" : ""} ${!labour ? "labour" : ""}`)
  }
    
    const { windscreen, delivery } = glass;
        if (!windscreen || !delivery) {
      throw new Error(`Glass prerequisites not met: ${!windscreen ? "windscreen" : ""} ${!delivery ? "delivery" : ""}`)
    }

      if (typeof windscreen !== "number" || typeof delivery !== "number") {
        throw new Error(`Invalid glass cost values: ${!windscreen ? "windscreen" : ""} ${!delivery ? "delivery" : ""}`)
      }
    
    const costOfGlass = windscreen + delivery;
    
    const { suctionCups, cleaningSolution, adhesive } = tools;
    const costOfTools = suctionCups + cleaningSolution + adhesive;
    
    const { hours, rate } = labour;
    let costOfLabour = hours * rate;
    
    let totalCost;
    
    if (isLabourFree) {
      totalCost = windscreen + delivery + suctionCups + cleaningSolution + adhesive;
    } else {
      totalCost = windscreen + delivery + suctionCups + cleaningSolution + adhesive + costOfLabour
    }
    
    const output = {
      cost: totalCost,
      breakdown: {glass: costOfGlass, tools: costOfTools, labour: costOfLabour},
      prerequisites
    }
    
    return output;
    
  } catch (error) {
    console.error(`Error calculating cost of job: ${error.message}`)
    throw error;
  }
}

const bmw118dWindscreenJobCost = calculateCost(true);

console.log(bmw118dWindscreenJobCost)