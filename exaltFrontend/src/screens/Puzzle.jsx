
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';


import Partes from '../components/PiezaRompeCabezas';

// hola
const PuzzlePiece = ({ imageSource, onPress }) => {
  return (
   /*<TouchableOpacity onPress={onPress}><Image source={imageSource} style={styles.pieza} /></TouchableOpacity>*/
    <Pressable onPress={onPress} style={styles.piece}
     >

       <Image  source={imageSource} style={styles.piece}/>  

     

    {/* <Text style={styles.pieceText}>{number}</Text>  */}
    </Pressable>
  );
};

const Puzzle = ({ nivel}) => {

  const [pieces, setPieces] = useState([])
  // const [pieces, setPieces] = useState(imageUrls.map(url => ({ uri: url })));
  //const [nivelActual,setNivel] =useState(nivel)

  const [selectedPieceIndex, setSelectedPieceIndex] = useState(null);
 
  const [matriz_sol, setmatriz_sol] = useState([]);


  const handlePress = (index) => {
    if (selectedPieceIndex !== null) {
      if (index !== selectedPieceIndex) {
        const newPieces = [...pieces];
        newPieces[selectedPieceIndex] = pieces[index];
        newPieces[index] = pieces[selectedPieceIndex];
        setPieces(newPieces);
        setSelectedPieceIndex(null);
      } else {
        setSelectedPieceIndex(index);
      }
    } else {
      setSelectedPieceIndex(index);
    }
  };
/*

  const comprobarPuzzleporNivel = (nivel) => {
  
    switch (nivel) {
      case 1:  return  matriz_sol = [
        { uri: "./src/images/parte1casa.png", width: 162, 
        height: 101.5 },
        {uri: "./src/images/parte2casa.png", width: 162, 
        height: 101.5 },
        { uri: "./src/images/parte3casa.png", width: 162, 
        height: 101.5 },
        { uri: "./src/images/parte4casa.png", width: 162, 
        height: 101.5 }    ]
        setmatriz_sol(matriz_sol)
        break;
      case 2: return [<Image source={{ uri: "./src/images/paisaje.png" }}  style={{ width: 324, height: 203, marginTop: "20px" }}/>]
 
        break;
      case 3: 
      return  [<Image source={{ uri: "./src/images/hoja3.jpg" }}  style={{ width: 324, height: 203, marginTop: "20px" }}/>]
     

        break;
      case 4: return [<Image source={{ uri: "./src/images/edificios.jpg" }}  style={{ width: 324, height: 203, marginTop: "20px" }}/>]
        break;
      case 5:return [<Image source={{ uri: "./src/images/leon.jpg" }}  style={{ width: 324, height: 203, marginTop: "20px" }}/>]

        break;
      case 6:return [<Image source={{ uri: "./src/images/nemo.jpg" }}  style={{ width: 324, height: 203, marginTop: "20px" }}/>]

        break;
      case 7:return [<Image source={{ uri: "./src/images/safari.jpg" }}  style={{ width: 324, height: 203, marginTop: "20px" }}/>]

        break;
      case 8: return [<Image source={{ uri: "./src/images/bosque_verde.jpg" }}  style={{ width: 324, height: 203, marginTop: "20px" }}/>]

        break;
      case 9: 
        break;
      case 10:
        break;

    }

  }

*/
  const asignarNumeroImagenes=(nivel)=>  {
    let commonStyles = {
      justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',

    };

switch(nivel){
  case 1:
    return [
      { uri: "./src/images/parte1casa.png", width: 162, 
      height: 101.5 },
      {uri: "./src/images/parte2casa.png", width: 162, 
      height: 101.5 },
      { uri: "./src/images/parte3casa.png", width: 162, 
      height: 101.5 },
      { uri: "./src/images/parte4casa.png", width: 162, 
      height: 101.5 }    ]/*.map(image => ({ ...image, style: commonStyles }))*/;;
      
    

  break;
  case 2:   return[

    { uri: "./src/images/paisaje1.png",width: 100, height: 84  },
    { uri: "./src/images/paisaje2.png",width: 100, height: 84 },
    { uri: "./src/images/paisaje3.png",width: 100, height: 84 },
    { uri: "./src/images/paisaje4.png",width: 100, height: 84  },
    { uri: "./src/images/paisaje5.png",width: 100, height: 84  },
    { uri: "./src/images/paisaje6.png",width: 100, height: 84  }


  ]/*.map(image => ({ ...image, style: commonStyles }))*/;

    break;
    case 3:  
    return[
      { uri: "./src/images/hoja8.jpg",width: 80, height: 101  },
      { uri: "./src/images/hoja4.jpg",width: 80, height: 101  },
      { uri: "./src/images/hoja7.jpg",width: 80, height: 101  },
      { uri: "./src/images/hoja6.jpg",width: 80, height: 101 },
      { uri: "./src/images/hoja5.jpg",width: 80, height: 101 },
      { uri: "./src/images/hoja3.jpg",width: 80, height: 101    },
      { uri: "./src/images/hoja2.jpg",width: 80, height: 101  },
      { uri: "./src/images/hoja1.jpg",width: 80, height: 101  }
    ]
      break;
      case 4:  return[
        { uri: "./src/images/e1.jpg",width: 63.5, height: 100  },
        { uri: "./src/images/e2.jpg",width: 63.5, height: 100   },
        { uri: "./src/images/e8.jpg",width: 63.5, height: 100 },
        { uri: "./src/images/e10.jpg",width: 63.5, height: 100 },
        { uri: "./src/images/e5.jpg",width: 63.5, height: 100    },
        { uri: "./src/images/e6.jpg",width: 63.5, height: 100     },
        { uri: "./src/images/e7.jpg",width: 63.5, height: 100  },
        { uri: "./src/images/e3.jpg",width: 63.5, height: 100   },
        { uri: "./src/images/e9.jpg",width: 63.5, height: 100   },
        { uri: "./src/images/e4.jpg",width: 63.5, height: 100   }
      ]
        break;
        case 5:   return[
          { uri: "./src/images/l1.jpg",width: 78.9, height: 66  },
          { uri: "./src/images/l2.jpg",width: 78.9, height: 66   },
          { uri: "./src/images/l3.jpg",width: 78.9, height: 66 },
          { uri: "./src/images/l4.jpg",width: 78.9, height: 66 },
          { uri: "./src/images/l5.jpg",width: 78.9, height: 66     },
          { uri: "./src/images/l6.jpg",width: 78.9, height: 66     },
          { uri: "./src/images/l7.jpg",width: 78.9, height: 66  },
          { uri:"./src/images/l8.jpg",width: 78.9, height: 66   },
          { uri: "./src/images/l9.jpg",width: 78.9, height: 66   },
          { uri: "./src/images/l10.jpg",width: 78.9, height: 66    },
          { uri: "./src/images/l11.jpg",width: 78.9, height: 66   },
          { uri: "./src/images/l12.jpg",width: 78.9, height: 66    }
        ]
          break;
          case 6:    return[
            { uri: "./src/images/00.jpg",width: 65, height: 45  },
            { uri: "./src/images/01.jpg",width: 65, height: 45    },
            { uri: "./src/images/11.jpg",width: 65, height: 45  },
            { uri: "./src/images/03.jpg",width: 65, height: 45 },
            { uri: "./src/images/10.jpg",width: 65, height: 45  },
            { uri: "./src/images/02.jpg",width: 65, height: 45      },
            { uri: "./src/images/43.jpg",width: 65, height: 45      },
            {uri: "./src/images/31.jpg",width: 65, height: 45      },
            { uri: "./src/images/20.jpg",width: 65, height: 45   },
            { uri:"./src/images/21.jpg",width: 65, height: 45    },
            { uri:"./src/images/22.jpg",width: 65, height: 45   },
            { uri:"./src/images/23.jpg",width: 65, height: 45   },
            { uri: "./src/images/40.jpg",width: 65, height: 45    },
            { uri: "./src/images/13.jpg",width: 65, height: 45   },
            { uri: "./src/images/32.jpg",width: 65, height: 45   },
            { uri: "./src/images/33.jpg",width: 65, height: 45   },
            { uri: "./src/images/30.jpg",width: 65, height: 45    },   
            { uri: "./src/images/41.jpg",width: 65, height: 45     },
            { uri: "./src/images/42.jpg",width: 65, height: 45 },
            { uri: "./src/images/12.jpg",width: 65, height: 45     }
          ]

            break;
            case 7:  return[
              { uri: "./src/images/safari1.jpg",width: 80, height:  35 },
              { uri: "./src/images/safari2.jpg",width: 80, height:  35     },
              { uri: "./src/images/safari3.jpg",width: 80, height:  35  },
              { uri: "./src/images/safari4.jpg",width: 80, height:  35   },
              { uri: "./src/images/safari5.jpg",width: 80, height:  35  },
              { uri: "./src/images/safari6.jpg",width: 80, height:  35     },
              { uri: "./src/images/safari7.jpg",width: 80, height:  35   },
              {uri: "./src/images/safari8.jpg",width: 80, height:  35  },
              { uri: "./src/images/safari9.jpg",width: 80, height:  35},
              { uri:"./src/images/safari10.jpg",width: 80, height:  35  },
              { uri:"./src/images/safari11.jpg",width: 80, height:  35 },
              { uri:"./src/images/safari12.jpg",width: 80, height:  35 },
              { uri: "./src/images/safari13.jpg",width: 80, height:  35   },
              { uri: "./src/images/safari14.jpg",width: 80, height:  35 },
              { uri: "./src/images/safari15.jpg",width: 80, height:  35 },
              { uri: "./src/images/safari16.jpg",width: 80, height:  35 },
              { uri: "./src/images/safari17.jpg",width: 80, height:  35     },   
              { uri: "./src/images/safari18.jpg",width: 80, height:  35   },
              { uri: "./src/images/safari19.jpg",width: 80, height:  35 },
              { uri: "./src/images/safari20.jpg",width: 80, height:  35     },
              { uri: "./src/images/safari21.jpg",width: 80, height:  35  },
              { uri: "./src/images/safari22.jpg",width: 80, height:  35 },
              { uri: "./src/images/safari23.jpg",width: 80, height:  35    },
              { uri: "./src/images/safari24.jpg",width: 80, height:  35   }
            ]
              break;
              case 8:  return[
                { uri: "./src/images/bosque_verde1.jpg",width: 45, height:  39 },
                { uri: "./src/images/bosque_verde2.jpg",width: 45, height:  39    },
                { uri: "./src/images/bosque_verde3.jpg",width: 45, height:  39 },
                { uri: "./src/images/bosque_verde4.jpg",width: 45, height:  39   },
                { uri: "./src/images/bosque_verde5.jpg",width: 45, height:  39 },
                { uri: "./src/images/bosque_verde6.jpg",width: 45, height:  39    },
                { uri: "./src/images/bosque_verde7.jpg",width: 45, height:  39  },
                {uri: "./src/images/bosque_verde8.jpg",width: 45, height:  39 },
                { uri: "./src/images/bosque_verde9.jpg",width: 45, height:  39},
                { uri:"./src/images/bosque_verde10.jpg",width: 45, height:  39 },
                { uri:"./src/images/bosque_verde11.jpg",width: 45, height:  39 },
                { uri:"./src/images/bosque_verde12.jpg",width: 45, height:  39},
                { uri: "./src/images/bosque_verde13.jpg",width: 45, height:  39 },
                { uri: "./src/images/bosque_verde14.jpg",width: 45, height:  39 },
                { uri: "./src/images/bosque_verde15.jpg",width: 45, height:  39},
                { uri: "./src/images/bosque_verde16.jpg",width: 45, height:  39},
                { uri: "./src/images/bosque_verde17.jpg",width: 45, height:  39    },   
                { uri: "./src/images/bosque_verde18.jpg",width: 45, height:  39 },
                { uri: "./src/images/bosque_verde19.jpg",width: 45, height:  39 },
                { uri: "./src/images/bosque_verde20.jpg",width: 45, height:  39     },
                { uri: "./src/images/bosque_verde21.jpg",width: 45, height:  39},
                { uri: "./src/images/bosque_verde22.jpg",width: 45, height:  39},
                { uri: "./src/images/bosque_verde23.jpg",width: 45, height:  39  },
                { uri: "./src/images/bosque_verde24.jpg",width: 45, height:  39},
                { uri: "./src/images/bosque_verde25.jpg",width: 45, height:  39 },
                { uri: "./src/images/bosque_verde26.jpg",width: 45, height:  39   },
                { uri: "./src/images/bosque_verde27.jpg",width: 45, height:  39 },
                { uri: "./src/images/bosque_verde28.jpg",width: 45, height:  39  }
              ]
                break;
                case 9:   
                break;
                case 10: 
                  break;
                  
}
  }

  useEffect(() => {
    const piezas = asignarNumeroImagenes(nivel);

    setPieces(piezas);
    // <Partes images={piezas}/>
  }, [nivel]);


  let numRows, numColumns;


  if (pieces.length === 4) {
    numRows = numColumns = 2;
  } else if (pieces.length === 6) {
    numRows = 3;
    numColumns = 2;
  } else if (pieces.length === 8) {
    numRows = 4;
    numColumns = 2;
  } else if (pieces.length === 10) {
    numColumns =2;
     numRows = 5;
  } else if (pieces.length === 12){
    numColumns =3;
    numRows = 8;
    // Lógica adicional para otros casos si es necesario
  }else if(pieces.length === 15){
    numColumns =8;
    numRows = 7;
  }else if(pieces.length===20){
    numColumns =4;
    numRows = 5;
  }else if(pieces.length === 24){

    numColumns =6;
    numRows = 4;

  }else if (pieces.length === 28){
    numColumns = 4;
    numRows = 6;
  }

  return (
    <View style={styles.container}>
    <View style={styles.tablero}>
      {Array.from({ length: numRows }, (_, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {Array.from({ length: numColumns }, (_, colIndex) => {
            const index = rowIndex * numColumns + colIndex;
            if (index < pieces.length) {
              return (
                <PuzzlePiece
                  key={index}
                  imageSource={pieces[index]}
                  onPress={() => handlePress(index)}
                />
              );
            } else {
              return <View key={colIndex} style={styles.emptyPiece} />;
            }
          })}
        </View>
      ))}
    </View>
  </View>

  /*  <View style={styles.container}>
  <View style={styles.tablero}>
    {Array.from({ length: Math.ceil(pieces.length / 3) }, (_, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {Array.from({ length: 3 }, (_, colIndex) => {
          const index = rowIndex * 3 + colIndex;
          return (
            <PuzzlePiece
              key={index}
              imageSource={pieces[index]}
              onPress={() => handlePress(index)}
            />
          );
        })}
      </View>
    ))}
  </View>
</View>*/

/*<View style={styles.container}>
  <View style={styles.tablero}>
  {Array.from({ length: Math.ceil(pieces.length / 2) }, (_, rowIndex) => (
    <View key={rowIndex} style={styles.row}>
      {[0, 1].map((colIndex) => {
        const index = rowIndex * 2 + colIndex;
        if (index < pieces.length) {
          return (
            <PuzzlePiece
              key={index}
              imageSource={pieces[index]}
              onPress={() => handlePress(index)}
            />
          );
        } else {
          return null;
        }
      })}
    </View>
*/
  

/*
<View style={styles.container}>
   <View style={styles.tablero}></View>
      <View style={styles.row}>
     
    <PuzzlePiece imageSource={pieces[index]} onPress={() => handlePress(0)}    />  
   <PuzzlePiece imageSource={pieces[index]} onPress={() => handlePress(2)}   />  
 
     </View>
       <View style={styles.row}> 
      
     <PuzzlePiece imageSource={pieces[index]} onPress={() => handlePress(1)}   />  
      <PuzzlePiece imageSource={pieces[index]} onPress={() => handlePress(3)}  /> 
    </View> 
    </View>*/
  
 );
};
const styles = StyleSheet.create({

  container: {
    display: "flex",
    
    justifyContent: "center",
    alignItems: "center",

    // borderWidth:1

  },
  tablero: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",

    flexWrap: "nowrap",

   

    width: 324,
    height: 203,
  },
  /*
 container: {
  display:"flex",

flexWrap:"wrap",
  alignItems:"center",
    width: 324,
    height: 203,
   borderWidth:1
  },*/
  row:
  {
   alignContent:"center",
   alignItems:"center",
  },
  piece: {

   

    justifyContent: 'center',

    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },

  pieceText: {
    fontSize: 20,
  },
  pieceImage:{
    width: '100%',
    height: '100%',
  }
});

export default Puzzle;

