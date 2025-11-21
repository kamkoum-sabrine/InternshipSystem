// src/app/views/pages/login/login-simple.spec.ts
import { ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks, flush } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';

describe('LoginComponent - Simple', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('SIMPLE-001 - devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('SIMPLE-002 - devrait appeler le service de login avec succès', fakeAsync(() => {
    // Arrange
    const mockResponse = { token: 'test-token', user: { id: 1, name: 'Test User' } };
    component.email = 'test@enicar.tn';
    component.password = 'test123';
    authService.login.and.returnValue(of(mockResponse));

    // Act
    component.login();
    tick(100);

    // Assert
    expect(authService.login).toHaveBeenCalledWith('test@enicar.tn', 'test123');
    expect(authService.login).toHaveBeenCalledTimes(1);
  }));

  it('SIMPLE-003 - devrait gérer les erreurs de login', fakeAsync(() => {
    // Arrange
    component.email = 'wrong@enicar.tn';
    component.password = 'wrongpass';
    authService.login.and.returnValue(throwError(() => new Error('Login failed')));

    // Espionner console.error pour vérifier que l'erreur est gérée
    const consoleErrorSpy = spyOn(console, 'error');

    // Act
    component.login();

    // Donner plus de temps et vider toutes les queues
    tick(1000); // Réduire à 1 seconde (10000 c'est trop long)
    flush(); // Vide microtasks
    discardPeriodicTasks(); // Vide periodic tasks

    // Assert
    expect(authService.login).toHaveBeenCalledWith('wrong@enicar.tn', 'wrongpass');
    expect(consoleErrorSpy).toHaveBeenCalled();
  }));

  it('SIMPLE-004 - devrait avoir des champs email et password vides initialement', () => {
    expect(component.email).toBe('');
    expect(component.password).toBe('');
  });
});