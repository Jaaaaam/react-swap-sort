import React, { Component } from 'react'

class Swappable extends Component {
    constructor() {
        super()

        this.state = {
            arrangedData: [],
            draggedElementOrder: null,
            customFunc: null
        }
    }

    componentDidMount() {
        this.setState({
            arrangedData: this.props.data
        })
    }

    allowDrop(ev) {
        ev.preventDefault();
    }
    
    drag(ev, order, customFunc = null) {
        console.log(order)

        this.setState({
            draggedElementOrder : order
        })
        // ev.dataTransfer.setData("src", ev.target.id);
        // console.log(ev.target.parentNode, 'TARGET DRAGSTART')
        
        // this.setState({
        //     initialParentNode: ev.target.parentNode
        // })
    }

    dragEnd(ev, customFunc = null) {

        // console.log(ev.target.parentNode, 'TARGET DRAGEND')
        // if (customFunc && (ev.target.parentNode != this.state.initialParentNode)) {
        //     console.log('custom func')
        //     this.props.customFunc()
        // }
    }
    
    drop(ev, order, customFunc = null, swappable = true) {
        console.log(order)
        ev.preventDefault();

        let newArrangedData = this.state.arrangedData
        console.log(newArrangedData, 'newState')
        let elementToBeSwapped =  newArrangedData.find((element) =>  {
            return element.order == order
        })
        let draggedElement =  newArrangedData.find((element) =>  {
            return element.order == this.state.draggedElementOrder
        })

        elementToBeSwapped.order = this.state.draggedElementOrder

        console.log(elementToBeSwapped, 'elementToBeSwapped')


        draggedElement.order = order
        console.log(draggedElement, 'draggedElement')

        newArrangedData.sort((a, b) => { return a.order - b.order })

        console.log(newArrangedData, 'newArrangedData')
        this.setState({
            arrangeData : newArrangedData
        }, () => {
            console.log(this.state.arrangedData, 'NEW STATE')
        })
        // let src = document.getElementById(ev.dataTransfer.getData("src"));
        // let srcParent = src.parentNode;
        // let target = document.getElementById(dragableId);

        // console.log(src, 'dragged element');
        // console.log(srcParent, 'parent of dragged');
        // console.log(target, 'element to be swapped')

        // swappable ? this.swapElements(src, target, srcParent) : this.transferElement(src, dropzoneId)

    }

    swapElements(src, target, srcParent) {
        target.replaceWith(src);
        srcParent.appendChild(target);
    }

    transferElement(src, dropzoneId) {
        let dropzone = document.getElementById(dropzoneId)
        dropzone.appendChild(src);
    }

    renderData(data, customFunc, swappable) {
        const dropZoneStyle = {
            width: '350px',
            minHeight: '100px',
            padding: '10px',
            border: '1px solid #aaaaaa'
        };

        const draggableStyle = {
            width: '50px',
            height: '50px',
            padding: '10px',
            border: '1px solid red'
        };

        return this.state.arrangedData.map((datum) => {
            return (
                <div
                // id = {dropzoneId}
                onDrop={(event) => this.drop(event, datum.order, customFunc, swappable)} 
                onDragOver={(event) => this.allowDrop(event)} 
                style={dropZoneStyle}>
                <div 
                    // id={ dragableId }
                    draggable="true"
                    onDragStart={(event) => this.drag(event, datum.order)}
                    onDragEnd = {(event) => this.dragEnd(event, customFunc)}
                    style={draggableStyle}>
                    { datum.data }
                </div>
            </div>
            )
        })

    }

    render() {

        let { arrangeData } = this.state
        const { id, data, customFunc, swappable } = this.props
        // const dropzoneId = 'drop' + id
        // const dragableId = 'drag' + id

        console.log(customFunc, 'customFunc')
        return (

            this.renderData(data, customFunc, swappable)

            // <div
            //     id = {dropzoneId}
            //     onDrop={(event) => this.drop(event, dragableId, dropzoneId, customFunc, swappable)} 
            //     onDragOver={(event) => this.allowDrop(event)} 
            //     style={dropZoneStyle}>
            //     <div id={ dragableId }
            //         draggable="true"
            //         onDragStart={(event) => this.drag(event)}
            //         onDragEnd = {(event) => this.dragEnd(event, customFunc)}
            //         style={draggableStyle}>
            //         { content }
            //     </div>
            // </div>
        )
    }
}

export default Swappable;