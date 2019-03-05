(() => {
	console.log('game startes');
	//variables always come first 
	// set up the puzzle pieces and boards 
	const thePieces = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

	// drag side 
	let piecesBoard = document.querySelector(".puzzle-pieces"),
		puzzleBoard = document.querySelector(".puzzle-board"),
		puzzleSelectors = document.querySelectorAll("#buttonHolder img");

	//drop side
	let dropZones = document.querySelectorAll('.drop-zone');

	//functions go in the middle 
	function createPuzzlePieces(pictureIndex) {
		//genrate puzzle pieces for the left hand side
		// debugger;
		// let newPuzzlePiece() {
			//generate puzzle pieces fro the left hand side
		thePieces.forEach((piece, index) => {
			let newPuzzlePiece = `<img draggable "id=piece${index}" class="puzzle-image" src="images/${piece + pictureIndex}.jpg" alt="boxes">`;

			piecesBoard.innerHTML += newPuzzlePiece;
		});

		puzzleBoard.style.backgroundImage = `url(images/backGround${pictureIndex}.jpg)`;
		
		initDrag();
	}

	// drag and drop functionality goes here
	

	function initDrag() {
		piecesBoard.querySelectorAll('img').forEach(img => {
			img.addEventListener("dragstart", function(e) {
				// e.preventDefault();
				console.log('draggin...');

				e.dataTransfer.setData("text/plain", this.id);
			});
		});
	}

	// dragover and drop puzzle pieces
		dropZones.forEach(zone => {
			zone.addEventListener("dragover", function(e) {
				e.preventDefault();
				console.log("you dragged over me!");
			});

			zone.addEventListener("drop", function(e) {
				e.preventDefault();
				console.log("you dropped sumpin on me");

				let pastDrop = e.target;
					while (pastDrop !== 0 && !pastDrop.classList.contains("drop-zone")) {
					pastDrop = pastDrop.parentNode;
				}

				if (pastDrop && pastDrop.childNodes.length > 0) {
					return false;
					e.preventDefault();
				}


				let pieces = e.dataTransfer.getData("text/plain");
				e.target.appendChild(document.querySelector(`#${pieces}`));
			});
		});

	function resetPuzzlePieces() {
		// changing the puzzle and regenrate the puzzle
		piecesBoard.innerHTML = "";
		createPuzzlePieces(this.dataset.puzzleref);
		// debugger;
		var images = document.getElementsByClassName("puzzle-image");
    			while(images.length > 4){
        		images[4].parentNode.removeChild(images[4]);
        }
	}

	//event handling down here
	puzzleSelectors.forEach(puzzle => puzzle.addEventListener("click", resetPuzzlePieces));


})();
