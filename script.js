
$(function () {

	var data =
		{
      "br1": { "text" : "Сельское хозяйство", "nested" :
			 	 {
	         "br1_sub1": { "text" : "Животноводство" },
	         "br1_sub2": { "text" : "Растеневодство" },
			 	 }
			 },

       "br2": { "text" : "Тяжелая промысшленность", "nested" :
			   {
	         "br2_sub1": { "text" : "Металлургия" },
	         "br2_sub2": { "text" : "Добыча природных ископаемых" },
	         "br2_sub3": { "text" : "Машиностроение" },
	         "br2_sub4": { "text" : "Электрооборудование" },
			   }
			 },

       "br3": { "text" : "Легкая промысшленность", "nested" :
				  {
	         "br2_sub1": { "text" : "Текстильное производство" },
				  }
			 }
		};

	function parseTree(data_json, target_dom_obj="body")
	{

      if (typeof this.parent_el === "undefined" || this.parent_el === null)
      {
        this.parent_el = target_dom_obj;
        console.log("Inital def of parent_el: " + this.parent_el);
      }
      if (typeof this.level_counter === "undefined" || this.level_counter === null)
      {
        this.level_counter = 1;
        console.log("Inital def of level_counter: " + this.level_counter);
      }

      for (var k in data_json)
	    {
        this.level_counter++;

        if(data_json[k] !== null && data_json[k] !== "undefined")
        {

          if (typeof data_json[k] !== "object")
          {
            var details = document.createElement( "details" ),
            summary = document.createElement( "summary" );
            const mContent = document.createTextNode(data_json[k]);

            details.attr( "id", k);
            this.parent_el = k;
            console.info("Пишем новго родителя - " + this.parent_el);
            summary.append(mContent);
            details.append(summary);

            $( target_dom_obj ).append(details);
          }
          else
          {
            if (typeof this.parent_el === "undefined" || this.parent_el === null)
            {
              console.info("Error");
              return false;
            }
            else
            {
              if(this.level_counter > 10) return false;
              console.info("Проваливаемся в элемент - " + this.parent_el);
              parseTree(data_json[k], "#" + this.parent_el);
            }
          }

					// <details>
					// 	<summary>Click to toggle_3</summary>
					// 	<span>Oh, hello_3</span>
					// </details>

        }
        else return true;

        if(this.level_counter > 10) return false;
	    }
      console.info("works");
      return true;
	}

  parseTree(data, "#place");


});
