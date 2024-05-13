class Job {
  constructor(name) {
    this.name = name;
    this.prerequisites = {
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
        freeLabour: false, // Assuming which, by default, labour != free
        hours: 6,
        rate: this.rate // Here 'this.rate' refers to the rate provided during instantiation of the Job instance
      }
    };
  }

  setLabourRate(rate) {
    this.prerequisites.labour.rate = rate;
  }
  
  setFreeLabour(value) {
    this.prerequisites.labour.freeLabour = value;
  }

  calculateCost() {
    try {
      const { glass, tools, labour } = this.prerequisites;
      const { windscreen, delivery } = glass;
      const { suctionCups, cleaningSolution, adhesive } = tools;
      const { freeLabour, hours, rate } = labour;

      const costOfGlass = windscreen + delivery;
      const costOfTools = suctionCups + cleaningSolution + adhesive;
      let costOfLabour = hours * rate;

      let totalCost;

      if (freeLabour) {
        totalCost = windscreen + delivery + suctionCups + cleaningSolution + adhesive;
      } else {
        totalCost = windscreen + delivery + suctionCups + cleaningSolution + adhesive + costOfLabour;
      }

      const output = {
        job: this.name,
        cost: totalCost,
        breakdown: { glass: costOfGlass, tools: costOfTools, labour: costOfLabour },
        prerequisites: this.prerequisites
      };

      return output;

    } catch (error) {
      console.error(`Error calculating cost of job: ${error.message}`);
      throw error;
    }
  }
}

const bmwWindscreen = new Job("118d Windscreen Replacement");
bmwWindscreen.setLabourRate(20); // Set the labour rate separately
bmwWindscreen.setFreeLabour(true)
bmwWindscreen.calculateCost();
