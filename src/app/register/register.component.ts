import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../shared/models/usuario.model';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  padraoEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  padraoSenhaForte = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#?!@$_%\^&*\-])[0-9a-zA-Z#?!@$_%\^&*\-]{8,}$/;
  formCadastro: FormGroup;
  validacaoCampos: boolean[] = []

  constructor(private formBuilder: FormBuilder, private router: Router, private registerService: RegisterService) { }

  ngOnInit(): void {
    this.formCadastro = this.criarFormulario();
  }

  criarFormulario(): FormGroup {
    return this.formBuilder.group({
      nome: this.formBuilder.control("", [Validators.required, Validators.minLength(3)]),
      sobrenome: this.formBuilder.control("", [Validators.required, Validators.minLength(3)]),
      email: this.formBuilder.control("", [Validators.required, Validators.pattern(this.padraoEmail)]),
      senha: this.formBuilder.control("", [Validators.required, Validators.pattern(this.padraoSenhaForte)]),
      confirmarSenha: this.formBuilder.control("", [Validators.required])
    }, {validator: this.compararSenha });
  }

  validarFormulario() {
    this.validarCampo("nome")
    this.validarCampo("sobrenome")
    this.validarCampo("email")
    this.validarCampo("senha")
    this.validarCampo("confirmarSenha")
  }

  validarCampo(nome) {
    if (nome) {
      var campo = this.formCadastro.get(nome);
      var isInvalid = campo.invalid;
      var isDirty = campo.dirty;
      var isTouched = campo.touched;
      if (isInvalid && (isDirty || isTouched)) {
        this.mostrarErro(nome);
        return true;
      } else if(isDirty || isTouched){
        this.mostrarSucesso(nome)
      }
    }
  }
  mostrarErro(campo){
    this.validacaoCampos[campo] = true;
  }
  mostrarSucesso(campo){
    this.validacaoCampos[campo] = false;
  }
  controleClasseValidacao(campo) {
    if(this.validacaoCampos[campo]){
      return "is-invalid";
    }
    return "is-valid";
  }

  cadastrarUsuario() {
    const usuario = this.formCadastro.value as Usuario
    this.registerService.postUsuario(usuario).subscribe((response) => { this.router.navigate(['/login'])})
  }

  compararSenha(grupo: FormGroup){
    let pass = grupo.get('senha').value;
    let confirmPass = grupo.get('confirmarSenha').value;
  
    return pass === confirmPass ? null : { notSame: true }    
  }
}
