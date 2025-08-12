import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Stone {
  name: string;
  shortInfo: string;
  fullInfo: string;
  properties: string;
  zodiac: string;
  chakra: string;
  price: string;
  showFullInfo: boolean;
  image: string;
  isEditing?: boolean;
}

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class AddItemComponent {
  stones: Stone[] = [
    {
      name: 'माणिक (Ruby)',
      shortInfo: 'नेतृत्व, आत्मविश्वास आणि सामर्थ्यासाठी ओळखला जाणारा हा लाल रंगाचा रत्न आहे.',
      fullInfo: 'माणिक हा सूर्याचा रत्न मानला जातो, जो नेतृत्व क्षमता, आत्मविश्वास आणि सामर्थ्य वाढवतो. हा धारणकर्त्याला ऊर्जा, उत्साह आणि यश देतो. शारीरिक आणि मानसिक आरोग्यासाठीही तो फायदेशीर मानला जातो.',
      properties: 'नेतृत्व, आत्मविश्वास, सामर्थ्य',
      zodiac: 'सिंह (Leo)',
      chakra: 'मूळाधार चक्र (Root Chakra)',
      price: '₹100',
      showFullInfo: false,
      image: './assets/img/stone1.jpg' // Example image path
    },
    {
      name: 'मोती (Pearl)',
      shortInfo: 'शांतता, सौम्यता आणि भावनिक संतुलनासाठी हा चंद्र ग्रहाचा रत्न आहे.',
      fullInfo: 'मोती हा चंद्राचा रत्न आहे, जो मन शांत ठेवण्यास, भावनिक स्थिरता आणण्यास आणि आंतरिक शांती वाढवण्यास मदत करतो. हा संवेदनशीलता आणि दयाळूपणा वाढवतो आणि नातेसंबंध सुधारतो.',
      properties: 'शांतता, सौम्यता, भावनिक संतुलन',
      zodiac: 'कर्क (Cancer)',
      chakra: 'स्वाधिष्ठान चक्र (Sacral Chakra)',
       price: '₹200',
      showFullInfo: false,
      image: './assets/img/stone2.jpg' // Example image path
      
    },
    {
      name: 'पोवळे (Red Coral)',
      shortInfo: 'ऊर्जा, धैर्य आणि इच्छाशक्ती वाढवणारा हा मंगळाचा रत्न आहे.',
      fullInfo: 'पोवळे हा मंगळ ग्रहाचा प्रतिनिधित्व करतो, जो धैर्य, ऊर्जा आणि इच्छाशक्ती वाढवतो. हा आत्मविश्वास देतो आणि अडथळे दूर करण्यास मदत करतो. शारीरिक आरोग्यासाठी आणि रोगांशी लढण्यासाठीही तो फायदेशीर मानला जातो.',
      properties: 'ऊर्जा, धैर्य, इच्छाशक्ती',
      zodiac: 'मेष, वृश्चिक (Aries, Scorpio)',
      chakra: 'मूळाधार चक्र (Root Chakra)',
       price: '₹300',
      showFullInfo: false,
      image: './assets/img/stone3.jpg' // Example image path
    },
    {
      name: 'पाचू (Emerald)',
      shortInfo: 'बुद्धिमत्ता, संवाद आणि व्यवसायात यश देणारा हा बुध ग्रहाचा रत्न आहे.',
      fullInfo: 'पाचू हा बुध ग्रहाचा रत्न आहे, जो बुद्धिमत्ता, संवाद कौशल्ये आणि ज्ञान वाढवतो. हा व्यवसायात यश मिळवण्यासाठी आणि आर्थिक वृद्धीसाठी शुभ मानला जातो. स्मृती सुधारण्यास आणि निर्णय क्षमतेला तीक्ष्ण करण्यास मदत करतो.',
      properties: 'बुद्धिमत्ता, संवाद, व्यावसायिक यश',
      zodiac: 'मिथुन, कन्या (Gemini, Virgo)',
      chakra: 'अनाहत चक्र (Heart Chakra)',
       price: '₹400',
      showFullInfo: false,
      image: './assets/img/stone4.jpg' // Example image path
    },
    {
      name: 'पुष्कराज (Yellow Sapphire)',
      shortInfo: 'ज्ञान, धन आणि समृद्धीसाठी हा गुरु ग्रहाचा रत्न आहे.',
      fullInfo: 'पुष्कराज हा गुरु ग्रहाचा रत्न आहे, जो ज्ञान, धन, समृद्धी आणि आध्यात्मिक वाढीसाठी अत्यंत शुभ मानला जातो. हा नशीब आणि चांगले आरोग्य आणतो. शिक्षण आणि व्यावसायिक प्रगतीसाठीही तो फायदेशीर आहे.',
      properties: 'ज्ञान, धन, समृद्धी',
      zodiac: 'धनु, मीन (Sagittarius, Pisces)',
      chakra: 'विशुद्ध चक्र (Throat Chakra)',
       price: '₹500',
      showFullInfo: false,
      image: './assets/img/stone5.jpg' // Example image path
    },
    {
      name: 'हिरा (Diamond)',
      shortInfo: 'सौंदर्य, प्रेम आणि समृद्धीसाठी हा शुक्र ग्रहाचा रत्न आहे.',
      fullInfo: 'हिरा हा शुक्र ग्रहाचा प्रतिनिधित्व करतो, जो सौंदर्य, प्रेम, आनंद आणि समृद्धी आणतो. हा वैवाहिक जीवनात आनंद आणि दीर्घायुष्य देतो. कलात्मक क्षमता आणि सर्जनशीलता वाढवतो.',
      properties: 'सौंदर्य, प्रेम, समृद्धी',
      zodiac: 'वृषभ, तूळ (Taurus, Libra)',
      chakra: 'स्वाधिष्ठान चक्र (Sacral Chakra)',
       price: '₹600',
      showFullInfo: false,
      image: './assets/img/stone6.jpg' // Example image path
    },
    {
      name: 'नीलम (Blue Sapphire)',
      shortInfo: 'शिस्त, न्याय आणि दीर्घायुष्यासाठी हा शनि ग्रहाचा रत्न आहे.',
      fullInfo: 'नीलम हा शनि ग्रहाचा रत्न आहे, जो शिस्त, न्याय आणि दीर्घायुष्य देतो. हा धारणकर्त्याला जबाबदार आणि कठोर परिश्रमी बनवतो. हा अचानक यश आणि आर्थिक लाभ देऊ शकतो, पण काळजीपूर्वक धारण करावा लागतो.',
      properties: 'शिस्त, न्याय, दीर्घायुष्य',
      zodiac: 'मकर, कुंभ (Capricorn, Aquarius)',
      chakra: 'आज चक्र (Third Eye Chakra)',
       price: '₹700',
      showFullInfo: false,
      image: './assets/img/stone7.jpg' // Example image path
    },
    {
      name: 'गोमेद (Hessonite)',
      shortInfo: 'शत्रूंपासून संरक्षण आणि मानसिक स्पष्टतेसाठी हा राहू ग्रहाचा रत्न आहे.',
      fullInfo: 'गोमेद हा राहू ग्रहाचा प्रतिनिधित्व करतो. हा धारणकर्त्याला शत्रूंपासून संरक्षण देतो, मानसिक स्पष्टता आणतो आणि नकारात्मक प्रभावांपासून वाचवतो. हा अडथळे दूर करण्यास आणि अचानक यश मिळवण्यास मदत करतो.',
      properties: 'संरक्षण, मानसिक स्पष्टता, अडथळे दूर करणे',
      zodiac: 'कुंभ (Aquarius, as sub-ruler)', // Rahu doesn't own a zodiac sign, but can influence it.
      chakra: 'मूळाधार चक्र (Root Chakra)',
       price: '₹800',
      showFullInfo: false,
      image: './assets/img/stone8.jpg' // Example image path
    },
    {
      name: 'लसण्या (Cat\'s Eye)',
      shortInfo: 'अंतर्ज्ञान, आध्यात्मिक वाढ आणि अचानक लाभासाठी हा केतू ग्रहाचा रत्न आहे.',
      fullInfo: 'लसण्या हा केतू ग्रहाचा रत्न आहे. हा अंतर्ज्ञान वाढवतो, आध्यात्मिक वाढीस प्रोत्साहन देतो आणि अचानक आर्थिक लाभ देऊ शकतो. हा भूतकाळातील कर्मांचा प्रभाव कमी करण्यास आणि आत्म-ज्ञानासाठी मदत करतो.',
      properties: 'अंतर्ज्ञान, आध्यात्मिक वाढ, अचानक लाभ',
      zodiac: 'मीन (Pisces, as sub-ruler)', // Ketu doesn't own a zodiac sign, but can influence it.
      chakra: 'आज चक्र (Third Eye Chakra)',
       price: '₹5600',
      showFullInfo: false,
      image: './assets/img/stone9.jpg' // Example image path
    }
  ];

  // Function to toggle full info visibility
  toggleInfo(stone: any) {
    stone.showFullInfo = !stone.showFullInfo;
  }

  editStone(stone: Stone) {
    stone.isEditing = true;
  }

  saveStone(stone: Stone) {
    stone.isEditing = false;
  }

  cancelEdit(stone: Stone) {
    stone.isEditing = false;
  }
}