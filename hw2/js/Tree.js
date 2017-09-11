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
		this.node_list = [];

// code to make a node tree
        for (var i = 0, len = arr.length; i < len; ++i) {
        	let node = new Node(arr[i].name,arr[i].parent);
        	this.node_list.push(node);

		}


//code to add children to the nodes
        for (var i = 0, len = this.node_list.length; i < len; ++i) {
            for (var j = 0, len = this.node_list.length; j < len; ++j) {
            	//console.log(node_list[j].parentName);
            	if(this.node_list[j].parentName == this.node_list[i].name){
                    this.node_list[j].parentNode = this.node_list[i];
                    this.node_list[i].children.push(this.node_list[j]);
				}

			}

		}

	}



	/**
	 * Function that builds a tree from a list of nodes with parent refs
	 */
	buildTree() {

	//Assign Positions and Levels by making calls to assignPosition() and assignLevel()

		this.assignLevel(this.node_list[0],0);
        this.assignPosition(this.node_list[0],0);

		console.log(this.node_list)
	}

	/**
	 * Recursive function that assign positions to each node
	 */

	assignPosition(node, position) {

		//to check if parent position greater than position then add parent position to the position

		if(node.parentNode != null && node.parentNode.position > position) position = node.parentNode.position


		// to check for nodes at same level and find the highest value of position if present, increment it by 1 and assign to position of this node

		for(var i = 0; i<this.node_list.length;i++) {
			if(this.node_list[i].level == node.level){
				if(this.node_list[i].position >= position) position = this.node_list[i].position+1;
			}
		}

		node.position = position;

		// explore all the children of the node recursively

        // let child_nodes = node.children;
        // child_nodes.forEach(function(node_child) {
        //     this.assignPosition(node_child,0);
        // });

		for(var i=0,len =node.children.length; i<len;++i) this.assignPosition(node.children[i],0);

    }


	/**
	 * Recursive function that assign levels to each node
	 */
	assignLevel(node, level) {
		//console.log(node,level);
        node.level = level;
        if(node.children != null){
            for (var i = 0, len = node.children.length; i < len; ++i) {
                this.assignLevel(node.children[i],level+1);

            }
        }
        return node;
		
	}

	/**
	 * Function that renders the tree
	 */
	renderTree() {

        let g = d3.select("g").data(this.node_list);

        var connectors = g.selectAll("line")
			              .data(this.node_list);
        var newconnectors=connectors.enter()
									.append("line")
									.attr("class", "line");

        connectors=newconnectors.merge(connectors);

        connectors.attr("x1", function (d) {
            return d.level*125;
        })
            .attr("y1", function (d) {
                return d.position*125;
            })
            .attr("x2", function (d) {
            	if(d.parentNode!= null){
                    return d.parentNode.level*125;
				}

            })
            .attr("y2", function (d) {
                if(d.parentNode!= null){
                    return d.parentNode.position*125;
				}

            });

        var circles = g.selectAll("circle")
			           .data(this.node_list);
        var newData=circles.enter()
						   .append("circle");

        circles=newData.merge(circles);

        circles.attr("cx", function (d) {
            return d.level*125;
        })
            .attr("cy", function (d) {
                return d.position*125;
            })
            .attr("r",function(d){
                return 45;
            })
			.attr("class","circle");

        var label = g.selectAll("g")
            .data(this.node_list)
            .enter();

        label.append("text")
            .attr("dx",
            function(d) {
                return d.level * 125;
            }).attr("dy",
            function(d) {
                return d.position * 125;
            })
            .text(function(d) {
                return d.name.toUpperCase();
            })
			.attr("class", "label");
	}
		
}