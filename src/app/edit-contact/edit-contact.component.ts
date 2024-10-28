import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact, phoneTypeValues, addreesTypeValues } from '../contacts/contact.model';
import { ContactsService } from '../contacts/contacts.service';
import { RectrictedValidatorDirective } from '../validator/rectricted-validator.directive';
import { DateValueAccessorDirective } from '../date-value-accessor/date-value-accessor.directive';
import { ProfileIconSelectorComponent } from "../profile-icon-selector/profile-icon-selector.component";


@Component({
  imports: [CommonModule, FormsModule, RectrictedValidatorDirective, DateValueAccessorDirective, ProfileIconSelectorComponent],
  standalone: true,
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})

export class EditContactComponent implements OnInit {
  phoneTypes = phoneTypeValues; //importar el valor de phoneTypeValue
  addressTypes = addreesTypeValues; //importar el valor de addressTypeValue
  //establecer las propiedades del nuevo objeto de contacto
  contact: Contact  ={
      id: '',
      icon:'',
      personal: false,
      firstName: '',
      lastName: '',
      dateOfBirth: null,
      favoritesRanking: 0,

      phones: [{
        phoneNumber: '',
        phoneType: '',
      }],

      address: {
        streetAddress: '',
        city: '',
        state: '',
        postalCode: '',
        addressType: '',
      },
      notes: '',
  }
//inyectamos el contactsService e importamos
  constructor(private route: ActivatedRoute,
    private contactsService: ContactsService,
    private router: Router ) { }



  ngOnInit() {
    const contactId = this.route.snapshot.params['id']; //console.log(contactId) //buscar nuestro contacto
    if (!contactId) return //tomar un observable de contacto y suscribirse a él para obtener el contacto
    this.contactsService.getContact(contactId)
      .subscribe((contact) =>  {
        if (contact) //si es contact devulevelo
        this.contact = contact;
        //console.log(contact)
      });
  }

  addPhone(){
    this.contact.phones.push({
      phoneNumber: '',
      phoneType: '',
    });

  }

  saveContact(form: NgForm) {
    console.log('form enviado', form.value); //imprimir el formulario enviado
    //console.log('contacto', this.contact.dateOfBirth, typeof this.contact.dateOfBirth); //imprimir el contacto
    this.contactsService.saveContact(this.contact).subscribe({ //llamamos o inyectamos al servicio saveContact y pasamos el contacto
      next: () => this.router.navigate(['/contacts']),  // si todo va bien, redirigir a la lista de contactos
      error: (err) => console.error(err) //si hay un error, imprímalo en la consola
    });
  }



}
