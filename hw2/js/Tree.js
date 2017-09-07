/** Class representing a Tree. */
console.log("Vishal Pandey");
class Tree {
	/**
	 * Creates a Tree Object
	 * parentNode, children, parentName,level,position
	 * @param {json[]} json - array of json object with name and parent fields
	 */

	constructor(json) {
		//console.log(json);

		var arr = json;
		var flatArray = json;
		var node_list = [];


        for (var i = 0, len = arr.length; i < len; ++i) {
        	let node = new Node(arr[i].name,arr[i].parent);
        	node_list.push(node);

		}

        for (var i = 0, len = node_list.length; i < len; ++i) {
        	switch(node_list[i].name){
				case 'Animal':
					node_list[i].position = 0;
					break;
                case 'Reptile':
                    node_list[i].position = 0;
                    break;
                case 'Mammal':
                    node_list[i].position = 1;
                    break;
                case 'Lizard':
                    node_list[i].position = 0;
                    break;
                case 'Snake':
                    node_list[i].position = 1;
                    break;
                case 'Bird':
                    node_list[i].position = 2;
                    break;
                case 'Equine':
                    node_list[i].position = 3;
                    break;
                case 'Bovine':
                    node_list[i].position = 4;
                    break;
                case 'Canine':
                    node_list[i].position = 5;
                    break;
                case 'Canary':
                    node_list[i].position = 2;
                    break;
                case 'Horse':
                    node_list[i].position = 3;
                    break;
                case 'Zebra':
                    node_list[i].position = 4;
                    break;
                case 'Cow':
                    node_list[i].position = 5;
                    break;
                case 'Dog':
                    node_list[i].position = 6;
                    break;
				default:
                    node_list[i].position = 0;

			}
		}

        for (var i = 0, len = node_list.length; i < len; ++i) {
            for (var j = 0, len = node_list.length; j < len; ++j) {
            	//console.log(node_list[j].parentName);
            	if(node_list[j].parentName == node_list[i].name){
            		node_list[j].parentNode = node_list[i];
            		node_list[i].children.push(node_list[j]);
				}

			}

		}

        function findDepth (data,depth) {
            data.level = depth;
            if(data.children != null){
                for (var i = 0, len = data.children.length; i < len; ++i) {
                    findDepth(data.children[i],depth+1)
                }
            }
            return data;
        }

        // function findPosition (data,position) {
        //     data.position = position;
        //     if(data.children != null){
        //         for (var i = 0, len = data.children.length; i < len; ++i) {
        //         	data.children.position = i;
        //             findPosition(data.children[i],)
        //         }
        //     }
        //     return data;
        // }
        //
        // function findHeight (data) {
        // 	temp_array = [];
        //     for (var i = 0, len = data.length; i < len; ++i) {
        //     	if(data.level == i){
        //
			// 	}
			// }
        //
        // }


		var final_array = findDepth(node_list[0],0);
        // var output_array = findPosition(final_array,0)

		console.log(final_array);


        // for (var i = 0, len = node_list[0].length; i < len; ++i) {
        	// node_list[i].level = i;
        	//
        //
		// }



        this.renderTree(final_array)
		
	}



	/**
	 * Function that builds a tree from a list of nodes with parent refs
	 */
	buildTree() {

	//Assign Positions and Levels by making calls to assignPosition() and assignLevel()
	}

	/**
	 * Recursive function that assign positions to each node
	 */
	assignPosition(node, position) {
		
	}

	/**
	 * Recursive function that assign levels to each node
	 */
	assignLevel(node, level) {
		
	}

	/**
	 * Function that renders the tree
	 */
	renderTree(final_array) {
        // Select the 'svg' element from the DOM wth d3
        let svg = d3.select("svg");


        // Select all circles using selectAll()
        // bind set1 to the selection using data()
        var circles = svg.selectAll("circle")
            .data(final_array.children);
        var newData=circles.enter().append("circle"); //append only to enter selection
        circles.exit().remove();
        circles=newData.merge(circles);

        circles.attr("cx", function (d) {
            return d.level*100;
        })
            .attr("cy", function (d) {
                return d.position*100;
            })
            .attr("r",function(d){
                return 10;
            });

        console.log(circles);
	}
		
}