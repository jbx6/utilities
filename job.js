class Job {
  constructor(name) {
    this.name = name;
    this.prerequisites = {
      materials: {
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
        hours: this.hours, // Here 'this.hours' refers to the hours provided during instantiation of the Job instance
        rate: this.rate // Here 'this.rate' refers to the rate provided during instantiation of the Job instance
      }
    };
  }

  setLabour(rate, hours, freeLabour) {
    this.prerequisites.labour.rate = rate;
    this.prerequisites.labour.hours = hours;
    this.prerequisites.labour.freeLabour = freeLabour;
  }

  calculateCost() {
    try {
      const { materials, tools, labour } = this.prerequisites;
      if (!materials || !tools || !labour) {
        throw new Error(`Prerequisites not met: ${!materials ? "materials" : ""} ${!tools ? "tools" : ""} ${!labour ? "labour" : ""}`);
      }
      
      const { windscreen, delivery } = materials;
      const { suctionCups, cleaningSolution, adhesive } = tools;
      const { freeLabour, hours, rate } = labour;

      const costOfMaterials = windscreen + delivery;
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
        breakdown: { glass: costOfMaterials, tools: costOfTools, labour: costOfLabour },
        prerequisites: this.prerequisites
      };

      console.log(output);
      // return output; // If you want to return the output for further processing

    } catch (error) {
      console.error(`Error calculating cost of job: ${error.message}`);
      throw error;
    }
  }
}

const bmwWindscreen = new Job("118d Windscreen Replacement");
bmwWindscreen.setLabour(20, 6, false); // Set labout rate, hours and freeLabour (true/false)
bmwWindscreen.calculateCost();
